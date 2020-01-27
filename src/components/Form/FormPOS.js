import React, { useState } from "react"

import { formatDate, numberSep } from '../../helper'

export default ({barang, show, add}) => {
    const [form, setForm] = useState({
        uraian: 'Penjualan ('+formatDate(Date.now())+')',
        tanggal: formatDate(Date.now()),
        details: [
            {
                barang_id: '',
                jumlah: ''
            }
        ],
        sum: 0
    })

    const addBarang = () => {
        const newArr = {
            barang_id: '',
            jumlah: ''
        }

        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: [...form.details, newArr],
            sum: form.sum
        })
    }

    const deleteBarang = (index) => {
        const arr = form.details
        const newArr = arr.filter((item, j) => index !== j)
        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: newArr,
            sum: form.sum
        })
    }

    const handleChange = (id, event) => {
        const newArr = form.details
        const { name, value } = event.target

        newArr[id] = {
            barang_id: name === "barang" ? value : newArr[id].barang_id,
            jumlah: name === "jumlah" ? value : newArr[id].jumlah
        }
        var x, sum = 0

        for(x in newArr){
            const sb = barang.find(brg => brg.id.toString() === form.details[x].barang_id)
            sum = sum + newArr[x].jumlah * sb.harga_jual
        }

        console.log(sum)

        setForm({
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: newArr,
            sum: sum
        })
    }

    const handleSubmit = (event) => {
        const final = {
            uraian: form.uraian,
            tanggal: form.tanggal,
            details: []
        }
        var x, hpp = 0
        for(x in form.details){
            const sb = barang.find(brg => brg.id.toString() === form.details[x].barang_id)
            final.details[parseInt(x)+3] = {
                akun_ref: '112',
                nominal: form.details[x].jumlah * sb.harga_pokok,
                dk: 'K',
                dp: {
                    barang_id: form.details[x].barang_id,
                    nominal: form.details[x].jumlah
                }
            }
            hpp = hpp + form.details[x].jumlah * sb.harga_pokok
        }
        final.details[0] = {
            akun_ref: '111',
            nominal: form.sum,
            dk: 'D'
        }
        final.details[1] = {
            akun_ref: '411',
            nominal: form.sum,
            dk: 'K'
        }
        final.details[2] = {
            akun_ref: '511',
            nominal: hpp,
            dk: 'D'
        }
        // console.log(final)
        add(final)
        setForm({
            uraian: 'Penjualan ('+formatDate(Date.now())+')',
            tanggal: formatDate(Date.now()),
            details: [
                {
                    barang_id: '',
                    jumlah: ''
                }
            ],
            sum: 0
        })
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
                    <div className="form-inline form-group">
                        <label className="mr-2 form-control">Total: </label>
                        Rp.
                        <label className="mx-2 form-control">{form.sum && numberSep(form.sum)}</label>
                    </div>
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
            Rp.<label className="form-control mx-2">{catatan.barang_id && numberSep(sb.harga_jual)}</label>
            X
            <input 
                className="form-control skinny mx-2" value={catatan.nominal} 
                type="number" name="jumlah" onChange={(e) => handleChange(id, e)} 
                disabled={!catatan.barang_id} required
                min={1} max={sb && sb.stok}
            />
            =
            Rp.<label className="form-control mx-2">{catatan.barang_id && catatan.jumlah && numberSep(catatan.jumlah * sb.harga_jual)}</label>
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