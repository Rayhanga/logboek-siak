import React, { useState } from 'react'

export default (props) => {
    const [form, setForm] = useState({
        nama: '',
        harga_pokok: '',
        stok: ''
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({
            nama: name === "nama" ? value : form.nama,
            harga_pokok: name === "harga_pokok" ? value : form.harga_pokok,
            stok: name === "stok" ? value : form.stok
        })
    }

    const handleSubmit = (event) => {
        props.add(form)
        setForm({
            nama: '',
            harga_pokok: '',
            stok: ''
        })
        event.preventDefault()
    }

    return(
        <div className={props.show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Tambah Akun Baru</h1> 
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-inline form-group">
                        <label className="form-control">Nama: </label>
                        <input className="mx-2 form-control" type="text" name="nama" 
                            required
                            value={form.nama}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">Harga Pokok: </label>
                        <input className="mx-2 form-control" type="number" name="harga_pokok" 
                            required
                            value={form.harga_pokok}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">Stok: </label>
                        <input className="mx-2 form-control" type="number" name="stok" 
                            required
                            value={form.stok}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
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