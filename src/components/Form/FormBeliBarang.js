import React, { useState, useEffect } from 'react'
import { fetcher, numberSep } from '../../helper'

export default (props) => {
    const [form, setForm] = useState({
        nama: '',
        harga_pokok: '',
        harga_jual: '',
        stok: ''
    })
    const [kas, setKas] = useState({saldo: 0})

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({
            nama: name === "nama" ? value : form.nama,
            harga_pokok: name === "harga_pokok" ? value : form.harga_pokok,
            harga_jual: name === "harga_jual" ? value : form.harga_jual,
            stok: name === "stok" ? value : form.stok
        })
    }

    const handleSubmit = (event) => {
        // console.log(form)
        props.add(form)
        setForm({
            nama: '',
            harga_pokok: '',
            stok: ''
        })
        fetcher('akun', 'GET').then(data => setKas(data.akun_list.find(a => a.ref.toString() === '111')))
        event.preventDefault()
    }

    useEffect(() => {
        fetcher('akun', 'GET').then(data => setKas(data.akun_list.find(a => a.ref.toString() === '111')))
    }, kas)

    return(
        <div className={props.show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Beli Barang Baru</h1>
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-inline form-group">
                        <label className="form-control">Saldo Kas: Rp.{kas && numberSep(kas.saldo - (form.stok * form.harga_pokok))}</label>
                    </div>
                    <div className="form-inline form-group">
                        <label className="form-control">Nama: </label>
                        <input className="mx-2 form-control" type="text" name="nama" 
                            required
                            value={form.nama}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">Stok: </label>
                        <input className="mx-2 form-control" type="number" name="stok" 
                            required
                            value={form.stok}
                            onChange={(e) => handleInput(e)}
                            min={0}
                        />
                    </div>
                    <div className="form-inline form-group">
                        <label className="form-control">Harga Pokok: </label>
                        <input className="mx-2 form-control" type="number" name="harga_pokok" 
                            required
                            value={form.harga_pokok}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">Harga Jual: </label>
                        <input className="mx-2 form-control" type="number" name="harga_jual" 
                            required
                            value={form.harga_jual}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <input 
                        className="btn btn-primary"
                        type="submit" 
                        value="Submit"
                        disabled={kas && kas.saldo - (form.stok * form.harga_pokok) < 0}
                    />
                </form>
            </div>
        </div>
    )
}