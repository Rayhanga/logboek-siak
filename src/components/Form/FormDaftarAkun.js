import React from "react"

export default (props) => {
    return <FormDaftarAkun show={props.show} add={props.add}/>
}

class FormDaftarAkun extends React.Component {
    state = {
        ref: '',
        nama: ''
    }

    handleInput = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: name === 'ref' ? value.slice(0, 3) : value
        })
        this.formValidator()
    }

    formValidator = () => {
        const refValid = this.state.ref !== '' || /\s/g.test(this.state.ref) || !isNaN(this.state.ref)
        const namaValid = this.state.nama !== '' || /\s/g.test(this.state.nama)

        return {
            valid: namaValid && refValid
        }
    }

    render() {
        return(
            <div className={this.props.show ? 'd-block card mx-auto m-3' : 'd-none'}>
                <div className="card-header">
                    <h1>Tambah Akun Baru</h1> 
                </div>
                <div className="card-body">
                    <form className="form">
                        <div className="form-inline form-group">
                            <label className="form-control">Ref: </label>
                            <input className="mx-2 form-control" type="number" name="ref" 
                                value={this.state.ref}
                                onChange={(e) => this.handleInput(e)}
                            />
                            <label className="form-control">Nama: </label>
                            <input className="mx-2 form-control" type="text" name="nama" 
                                value={this.state.nama}
                                onChange={(e) => this.handleInput(e)}
                            />
                        </div>
                        <input 
                            disabled={!this.formValidator().valid}
                            className="btn btn-primary"
                            type="button" 
                            value="Submit"
                            onClick={() => this.props.add(this.state.ref, this.state.nama)}
                        />
                    </form>
                </div>
            </div>
        )
    }
}