import React, { useState } from "react"

export default ({akun, show, add}) => {
    const [form, setForm] = useState({
        uraian: '',
        details: [
            {
                akun_ref: '',
                nominal: '',
                dk: 'D'
            },
            {
                akun_ref: '',
                nominal: '',
                dk: 'K'
            }
        ]
    })

    const addCatatan = () => {
        formValidator()
        const { sum } = formValidator()
        const newArr = {
            akun_ref: '',
            nominal: sum === 0 ? '' : (Math.abs(sum)).toString(),
            dk: sum <= 0 ? 'D' : 'K'
        }

        setForm({
            uraian: form.uraian,
            details: [...form.details, newArr]
        })
    }

    const deleteCatatan = (id) => {
        const arr = form.details
        const newArr = arr.filter((item, j) => id !== j)
        setForm({
            uraian: form.uraian,
            details: newArr
        })

        formValidator()
    }

    const handleChange = (id, event) => {
        const newArr = form.details
        const { name, value } = event.target

        newArr[id] = {
            akun_ref: name === "akun" ? value : newArr[id].akun_ref,
            nominal: name === "nominal" ? value : newArr[id].nominal,
            dk: name === "dk" ? value : newArr[id].dk
        }

        setForm({
            uraian: form.uraian,
            details: newArr
        })

        formValidator()
    }

    const handleUraian = (event) => {
        const { value } = event.target
        setForm({uraian: value, details:form.details})
        formValidator()
    }

    const handleSubmit = (event) => {
        // add(uraian, dJurnal)
        console.log(form.uraian, form.details)
        setForm({
            uraian: '',
            details:
            [
                {
                    akun_ref: 'PK',
                    nominal: '',
                    dk: 'D'
                },
                {
                    akun_ref: 'PK',
                    nominal: '',
                    dk: 'K'
                }
            ]
        })
        event.preventDefault()
    }

    const formValidator = () => {
        const { details, uraian } = form
        var a, sum = 0, akunValid = false
        for(a in details){
            const { akun_ref, dk, nominal } = details[a]
            akunValid = !(akun_ref === 'PK') 
            sum = dk === 'D' ? sum + parseFloat(nominal) : sum - parseFloat(nominal)
        }

        const balanceValid = sum === 0
        const uraianValid = uraian !== '' || uraian.match(/^ *$/) === null
        const notEmpty = details.length >= 2

        return {
            sum: sum,
            valid: akunValid && balanceValid && uraianValid && notEmpty
        }
    }

    return (
        <div className={show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Pencatatan Jurnal Umum</h1> 
            </div>
            <div className="card-body">
                <form className="form" onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-inline form-group">
                        <label className="form-control">Uraian: </label>
                        <input className="mx-2 form-control" type="text" name="uraian"
                            required 
                            value={form.uraian}
                            onChange={(e) => handleUraian(e)}
                        />
                        <label className="form-control">Tanggal: </label>
                        <input className="mx-2 form-control" type="text" name="tanggal" disabled
                            value={new Date().getDate() + '/' + (new Date().getMonth() + 1 )+ '/' + new Date().getFullYear()}
                        />
                    </div>
                    {form.details && form.details.map((catatan, index) => (
                        <Entry key={index} id={index} catatan={catatan} akun={akun}
                            handleChange={handleChange}
                            deleteCatatan={deleteCatatan}
                        />
                    ))}
                    <input 
                        className="btn btn-primary"
                        type="button" 
                        value="Tambah Entry" 
                        onClick={() => addCatatan()}
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
    const { id, handleChange, deleteCatatan, catatan, akun } = props ? props : () => {}
    return(
        <div className="form-group form-inline">
            <label className="form-control">{catatan.akun_ref ? catatan.akun_ref : '---'}</label>
            <select className="form-control mx-2" value={catatan.akun_ref} name="akun" onChange={(e) => handleChange(id, e)} required>
                <option value='' disabled>Pilih Akun</option>
                {akun && akun.map((item) => (
                    <option key={item.ref} value={item.ref}>{item.nama}</option>
                ))}
            </select>
            <input className="form-control mx-2" type="number" value={catatan.nominal} name="nominal" onChange={(e) => handleChange(id, e)} required/>
            <select className="form-control mx-2" value={catatan.dk} name="dk" onChange={(e) => handleChange(id, e)}>
                <option value="D">Debit</option>
                <option value="K">Kredit</option>
            </select>
            {id > 1 && <input 
                className="btn btn-danger mx-2" 
                type="button" 
                value="X"
                onClick={() => deleteCatatan(id)}
            />}
        </div>
    )
}