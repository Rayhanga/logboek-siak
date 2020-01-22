import React, { useState } from 'react'

export default () => {
    const [form, setForm] = useState({
        
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setForm({
            nama: name === "nama" ? value : form.nama,
            ref: name === "ref" ? value.slice(0,3) : form.ref
        })
    }

    return(
        <div className={props.show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Tambah Akun Baru</h1> 
            </div>
            <div className="card-body">
                <form className="form">
                    <div className="form-inline form-group">
                        <label className="form-control">Ref: </label>
                        <input className="mx-2 form-control" type="number" name="ref" 
                            value={form.ref}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">Nama: </label>
                        <input className="mx-2 form-control" type="text" name="nama" 
                            value={form.nama}
                            onChange={(e) => handleInput(e)}
                        />
                    </div>
                    <input 
                        className="btn btn-primary"
                        type="button" 
                        value="Submit"
                        onClick={() => props.add(form.ref, form.nama)}
                    />
                </form>
            </div>
        </div>        
    )
}