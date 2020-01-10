import React from "react"
import FormDaftarAkun from "../Form/FormDaftarAkun"

export default (props) => {
    return <BukuBesar data={props.data} methods={props.methods}/>
}

const BukuBesar = ({data, methods}) => {
    const [formTambah, setFormTambah] = React.useState(false)
    const { add } = methods ? methods : () => {}
    return (
        <div className="container">
            <h1>Daftar Akun</h1>
            <input className="btn btn-primary" type="button" value="Tambah Akun Baru" onClick={() => setFormTambah(!formTambah)}/>
            <FormDaftarAkun show={formTambah} add={add}/>
            {data && data.map((item) => (
                <div className="m-3 card" key={item.ref}>
                    <div className="card-header">
                        <h2>{item.nama} - {item.ref}</h2>
                    </div>
                    <AkunDetails details={item.details}/>
                </div>
            ))}
        </div>
    )
}

const AkunDetails = ({details}) => {
    const saldo = () => {
        var x, sum = 0
        for(x in details){
            sum += details[x].dk === 'D' ? details[x].nominal : -1 * details[x].nominal
        }
        return sum
    }

    return (
        <div className="card-body">
            {details && details.map((detail) => (
                <div className="m-1 card card-body">
                    <div className="row">
                        <div className="col">
                            <h3>{detail.uraian}</h3>
                        </div>
                        <div className={'col text-right lead ' + (detail.dk === 'D' ? 'mr-5' : '')}>
                            Rp. {detail.nominal}
                        </div>
                    </div>
                </div>
            ))}
            <div className="m-1 ml-5 card card-body">
                <div className="row">
                    <div className="col">
                        <h3>
                            Saldo Akhir:
                        </h3>
                    </div>
                    <div className={'col text-right lead ' + (saldo() >= 0 ? 'mr-5' : '')}>
                        Rp. {Math.abs(saldo())}
                    </div>
                </div>
            </div>
        </div>
    )
}


// const Item = ({data}) => {
//     const value = Object.values(data)
//     return(
//         <tr>{value.map((value) => (<td key={value.id ? value.id : value.ref}>{value}</td>))}</tr>  
//     )
// }

// const Head = ({data}) => {
//     const key = Object.keys(data)
//     return(
//         <>{key.map((key, index) => (<th key={index}>{key.replace(/^\w/, c => c.toUpperCase())}</th>))}</>
//     )
// }