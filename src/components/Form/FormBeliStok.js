import React, { useState, useEffect } from 'react'

import { fetcher, numberSep } from '../../helper'

export default (props) => {
    const [form, setForm] = useState({
        id: '',
        stok: '',
        harga_pokok: 0
    })

    const [kas, setKas] = useState({saldo: 0})

    const barang = props.data ? props.data : () => {}

    const handleInput = (e) => {
        const { name, value } = e.target
        
        setForm({
            id: name === "id" ? value : form.id,
            stok: name === "stok" ? value : form.stok,
            harga_pokok:  selectedBarang ? selectedBarang.harga_pokok : form.harga_pokok,
            nama:  selectedBarang ? selectedBarang.nama : form.nama
        })
    }

    const handleSubmit = (event) => {
        props.add(form)
        // console.log(form)
        setForm({
            id: '',
            stok: '',
            harga_pokok: 0,
            nama:  ''
        })
        event.preventDefault()
    }

    useEffect(() => {
        fetcher('akun', 'GET').then(data => setKas(data.akun_list.find(a => a.ref.toString() === '111')))
    }, [])

    const selectedBarang = barang.find(b => b.id === parseInt(form.id))

    return(
        <div className={props.show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Beli Stok</h1> 
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-inline form-group">
                        <label className="form-control">Saldo Kas: Rp.{kas && numberSep(kas.saldo - (selectedBarang ? selectedBarang.harga_pokok * form.stok : form.stok ))}</label>
                    </div>
                     <div className="form-inline form-group">
                        <label className="form-control">Barang: </label>
                        <select className="mx-2 form-control" name="id" value={form.id} onChange={(e) => handleInput(e)} required>
                            <option disabled value=''>Pilih Barang</option>
                            {barang && barang.map((item, i)=>(
                                <option key={item.id} value={item.id}>{item.nama}</option>
                            ))}
                        </select>
                    </div>
                    {form.id &&
                    <>
                    <div className="form-inline form-group">
                        <label className="mr-2 form-control">Harga Pokok: </label>
                        Rp.<label className="mx-2 form-control">{selectedBarang && numberSep(selectedBarang.harga_pokok)}</label>
                    </div>
                    <div className="form-inline form-group">
                        <label className="form-control">Jumlah Stok yang dibeli: </label>
                        <input className="mx-2 form-control" type="text" name="stok" 
                            required
                            value={form.stok}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    </>
                    }
                    <input 
                        className="btn btn-primary"
                        type="submit" 
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}