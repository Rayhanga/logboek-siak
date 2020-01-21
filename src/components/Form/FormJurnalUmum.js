import React from "react"

export default ({akun, show, add}) => {
    return (
        <div className={show ? 'd-block card mx-auto m-3' : 'd-none'}>
            <div className="card-header">
                <h1>Pencatatan Jurnal Umum</h1> 
            </div>
            <div className="card-body">
                <FormCatatan akun={akun} add={add}/>
            </div>
        </div>
    )
}

class FormCatatan extends React.Component {
    state = {
        uraian: '',
        catatanList: [
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
    }

    addCatatan = () => {
        const { sum } = this.formValidator(this.state.catatanList)

        const empty = {
            akun_ref: 'PK',
            nominal: sum === 0 ? '' : Math.abs(sum),
            dk: sum <= 0 ? 'D' : 'K'
        }

        this.setState({
            catatanList: this.state.catatanList.concat(empty)
        })

        this.formValidator()
    }

    deleteCatatan = (id) => {
        this.setState(state => {
            const catatanList = state.catatanList.filter((item, j) => id !== j)
            return {
                catatanList
            }
        })
        this.formValidator()
    }

    handleChange = (id, e) => {
        const arr = this.state.catatanList
        const { value , name } = e.target

        arr[id] = {
            akun_ref: name === 'akun' ? value : arr[id].akun_ref,
            nominal: name === 'nominal' ? value < 0 ? value * -1 : value : arr[id].nominal,
            dk: name === 'dk' ? value : arr[id].dk
        }
        
        this.setState({
            catatanList: arr
        })

        this.formValidator()
    }

    handleInput = (e) => {
        const { value, name } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {
        this.props.add(this.state.uraian, this.state.catatanList)
        this.setState({
            uraian: '',
            catatanList: [
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
    }

    formValidator = () => {
        const arr = this.state.catatanList
        var a, sum = 0, akunValid = false
        for(a in arr){
            const { akun_ref, dk, nominal } = arr[a]
            akunValid = !(akun_ref === 'PK') 
            sum = dk === 'D' ? sum + parseFloat(nominal) : sum - parseFloat(nominal)
        }

        const balanceValid = sum === 0
        const uraianValid = this.state.uraian !== '' || this.state.uraian.match(/^ *$/) === null
        const notEmpty = this.state.catatanList.length >= 2

        return {
            sum: sum,
            valid: akunValid && balanceValid && uraianValid && notEmpty
        }
    }

    render() {
        return(
            <form className="form">
                <div className="form-inline form-group">
                    <label className="form-control">Uraian: </label>
                    <input className="mx-2 form-control" type="text" name="uraian" 
                        value={this.state.uraian}
                        onChange={(e) => this.handleInput(e)}
                    />
                    <label className="form-control">Tanggal: </label>
                    <input className="mx-2 form-control" type="text" name="tanggal" disabled
                        value={new Date().getDate() + '/' + (new Date().getMonth() + 1 )+ '/' + new Date().getFullYear()}
                    />
                </div>
                {this.state.catatanList.map((catatan, index) => (
                    <Catatan key={index} id={index} catatan={catatan} akun={this.props.akun}
                        handleChange={this.handleChange}
                        deleteCatatan={this.deleteCatatan}
                    />
                ))}
                <input 
                    className="btn btn-primary"
                    type="button" 
                    value="Tambah Entry" 
                    onClick={() => this.addCatatan()}
                />
                <input 
                    disabled={!this.formValidator().valid}
                    className="mx-2 btn btn-primary"
                    type="button" 
                    value="Submit"
                    onClick={() => this.handleSubmit()}
                />
            </form>
        )
    }
}

const Catatan = ({deleteCatatan, handleChange, id, catatan, akun}) => {
    return(
        <div className="form-group form-inline">
            <label className="form-control">{catatan.akun_ref}</label>
            <select className="form-control mx-2" value={catatan.akun_ref} name="akun" onChange={(e) => handleChange(id, e)}>
                <option value='PK' disabled>Pilih Akun</option>
                {akun && akun.map((item) => (
                    <option key={item.ref} value={item.ref}>{item.nama}</option>
                ))}
            </select>
            <input className="form-control mx-2" type="number" value={catatan.nominal} name="nominal" onChange={(e) => handleChange(id, e)}/>
            <select className="form-control mx-2" value={catatan.dk} name="dk" onChange={(e) => handleChange(id, e)}>
                <option value="D">Debit</option>
                <option value="K">Kredit</option>
            </select>
            <input 
                className="btn btn-danger mx-2" 
                type="button" 
                value="X"
                onClick={() => deleteCatatan(id)}
            />
        </div>
    )
}