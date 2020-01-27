import React, { useState } from 'react'

import { formatDate } from '../../helper'

export default (props) => {
    const [form, setForm] = useState({
        ref: '',
        tmin: formatDate(Date.now()).replace(/[0-9]{2}$/, '01'),
        tmax: formatDate(Date.now()).replace(/[0-9]{2}$/, parseInt(formatDate(Date.now()).match(/[0-9]{2}$/))+1)
    })

    const { data } = props

    const handleInput = (event) => {
        const { name, value } = event.target
        setForm({
            ref: name === "ref" ? value : form.ref,
            tmin: name === "tmin" ? value : form.tmin,
            tmax: name === "tmax" ? value : form.tmax
        })
    }

    const handleSubmit = (event) => {
        props.select(form)
        event.preventDefault()
    }

    return(
        <div className="d-block card mx-auto m-3">
            <div className="card-header">
                <h1>Buku Besar</h1> 
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-inline form-group"> 
                        <label className="form-control">{form.ref ? form.ref : '---'}</label>
                        <select className="form-control mx-2" value={form.ref} name="ref" onChange={(e) => handleInput(e)} required>
                            <option value='' disabled>Pilih Akun</option>
                            {data && data.map((item) => (
                                <option key={item.ref} value={item.ref}>{item.nama}</option>
                            ))}
                        </select>
                        <label className="form-control">Periode: </label>
                        <input className="mx-2 form-control" type="date" name="tmin" required
                            max={form.tmax}
                            value={form.tmin}
                            onChange={(e) => handleInput(e)}
                        />
                        <label className="form-control">-</label>
                        <input className="mx-2 form-control" type="date" name="tmax" required
                            min={form.tmin}
                            value={form.tmax}
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