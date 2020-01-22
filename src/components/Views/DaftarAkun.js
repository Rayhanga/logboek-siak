import React, { useState } from "react"
import FormAkunBaru from "../Form/FormAkunBaru"

export default (props) => {
    const [show, setShow] = useState(false)
    const { add, data } = props
    
    return (
        <div className="container">
            <h1>Daftar Akun</h1>
            <input className="btn btn-primary" type="button" value="Tambah Akun Baru" onClick={() => setShow(!show)}/>
            <FormAkunBaru show={show} add={add}/>
            {data && data.map((item) => (
                <div className="m-3 card" key={item.ref}>
                    <div className="card-header">
                        <h2>{item.nama} - {item.ref}</h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

// const AkunDetails = ({details}) => {
//     const saldo = () => {
//         var x, sum = 0
//         for(x in details){
//             sum += details[x].dk === 'D' ? details[x].nominal : -1 * details[x].nominal
//         }
//         return sum
//     }

//     return (
//         <div className="card-body">
//             <div className="card-body mx-3">
//                 <div className="row border">
//                     <div className="col-8 border text-left">
//                         <h5>Uraian</h5>
//                     </div>
//                     <div className="col-2 border text-left">
//                         <h5>Debit</h5>
//                     </div>
//                     <div className="col-2 border text-left">
//                         <h5>Kredit</h5>
//                     </div>
//                 </div>
//             {details && details.map((detail) => (
//                 <div className="row border">
//                     <div className="col-8 border text-left">
//                         {detail.uraian}
//                     </div>
//                     <div className="col-2 border text-right">
//                         {detail.dk === 'D' ? detail.nominal: () => {}}
//                     </div>
//                     <div className="col-2 border text-right">
//                         {detail.dk === 'K' ? detail.nominal: () => {}}
//                     </div>
//                 </div>
//             ))}
//             </div>
//             <div className="mx-3 card card-body">
//                 <div className="row">
//                     <div className="col">
//                         <h3>
//                             Saldo Akhir:
//                         </h3>
//                     </div>
//                     <div className={'col text-right lead ' + (saldo() >= 0 ? 'mr-5' : '')}>
//                         {saldo()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


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