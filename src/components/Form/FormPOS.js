import React, { useState } from "react"

import { formatDate, numberSep } from '../../helper'

export default ({barang, show, add}) => {
    const [form, setForm] = useState({
        uraian: 'Penjualan '+formatDate(Date.now()),
        tanggal: formatDate(Date.now()),
        details: [
            {
                barang_id: '',
                jumlah: ''
            }
        ]
    })

    const [profit, setProfit] = useState(0)

    const addBarang = () => {
        const newArr = {
            barang_id: '',
            jumlah: ''
        }

        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: [...form.details, newArr]
        })
    }

    const deleteBarang = (index) => {
        const arr = form.details
        const newArr = arr.filter((item, j) => index !== j)
        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: newArr
        })
    }

    const handleChange = (id, event) => {
        const newArr = form.details
        const { name, value } = event.target

        newArr[id] = {
            barang_id: name === "barang" ? value : newArr[id].barang_id,
            jumlah: name === "jumlah" ? value : newArr[id].jumlah
        }

        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: newArr
        })
    }

    const handleSubmit = (event) => {
        const final = {
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: []
        }
        var x
        for(x in form.details){
            const sb = barang.find(brg => brg.id.toString() === form.details[x].barang_id)
            final.details[parseInt(x)+1] = {
                akun_ref: '112',
                nominal: form.details[x].jumlah * sb.harga_pokok,
                dk: 'K',
                dp: {
                    barang_id: form.details[x].barang_id,
                    nominal: form.details[x].jumlah
                }
            }
            setProfit(profit + form.details[x].jumlah * sb.harga_jual)
        }
        final.details[0] = {
            akun_ref: '411',
            nominal: profit,
            dk: 'D'
        }
        console.log(final)
        event.preventDefault()
    }

    return (
        <div className={show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Point of Sale</h1> 
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-inline form-group">
                        <label className="form-control">Uraian: </label>
                        <input className="mx-2 form-control" type="text" name="uraian"
                            required 
                            disabled
                            value={form.uraian}
                        />
                        <label className="form-control">Tanggal: </label>
                        <input className="mx-2 form-control" type="date" name="tanggal"
                            required
                            disabled
                            value={form.tanggal}
                        />
                    </div>
                    {form.details && form.details.map((catatan, index) => (
                        <Entry key={index} id={index} catatan={catatan} barang={barang}
                            handleChange={handleChange}
                            deleteCatatan={deleteBarang}
                        />
                    ))}
                    <input 
                        className="btn btn-primary"
                        type="button" 
                        value="Tambah Entry" 
                        onClick={() => addBarang()}
                    />
                    <input 
                        className="mx-2 btn btn-primary"
                        type="submit" 
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

const Entry = (props) => {
    const { id, handleChange, deleteCatatan, catatan, barang } = props ? props : () => {}
    const sb = barang.find(brg => brg.id.toString() === catatan.barang_id)

    return(
        <div className="form-group form-inline">
            <label className="form-control">{catatan.barang_id && 'Stok: '+sb.stok}</label>
            <select className="form-control mx-2" value={catatan.barang_id} name="barang" onChange={(e) => handleChange(id, e)} required>
                <option value='' disabled>Pilih Barang</option>
                {barang && barang.map((item) => (
                    <option key={item.id} value={item.id}>{item.nama}</option>
                ))}
            </select>
            Rp.<label className="form-control mx-2">{catatan.barang_id && numberSep(sb.harga_pokok)}</label>
            X
            <input 
                className="form-control skinny mx-2" value={catatan.nominal} 
                type="number" name="jumlah" onChange={(e) => handleChange(id, e)} 
                disabled={!catatan.barang_id} required
                min={1} max={sb && sb.stok}
            />
            =
            Rp.<label className="form-control mx-2">{catatan.barang_id && catatan.jumlah && numberSep(catatan.jumlah * sb.harga_pokok)}</label>
            {id > 0 && 
            <input 
                className="btn btn-danger mx-2" 
                type="button" 
                value="X"
                onClick={() => deleteCatatan(id)}
            />
            }
        </div>
    )
}