import React from 'react'

import FormJurnalUmum from '../Form/FormJurnalUmum'

export default (props) => {
    return <JurnalUmum data={props.data} methods={props.methods}/>
}
const JurnalUmum = ({data, methods}) => {
    const [showUmum, setShowUmum] = React.useState(false)
    const { akun, jurnal } = data ? data : () => {}
    const { add } = methods ? methods : () => {}

    return (
        <div className="container">
            <h1>Jurnal Umum</h1>
            <input className="btn btn-primary" type="button" value="Catat Jurnal Umum" onClick={() => setShowUmum(!showUmum)}/>
            <FormJurnalUmum akun={akun} show={showUmum} add={add}/>
            {jurnal && jurnal.map((item) => (
                <div className="m-3 card" key={item.id}>
                    <div className="card-header">
                        <h2>{item.uraian} - {item.tanggal}</h2>
                    </div>
                    <JurnalDetail details={item.details}/>
                </div>
            ))}
        </div>
    )
}

const JurnalDetail = ({details}) => {
    return(
        <div className="card-body mx-3">
            <div className="row border">
                <div className="col-8 border text-left">
                    <h5>Akun</h5>
                </div>
                <div className="col-2 border text-left">
                    <h5>Debit</h5>
                </div>
                <div className="col-2 border text-left">
                    <h5>Kredit</h5>
                </div>
            </div>
            {details.map((detail) => (
                <div className="row border">
                    <div className="col-8 border text-left">
                        {detail.akun}
                    </div>
                    <div className="col-2 border text-right">
                        {detail.dk === 'D' ? detail.nominal: () => {}}
                    </div>
                    <div className="col-2 border text-right">
                        {detail.dk === 'K' ? detail.nominal: () => {}}
                    </div>
                </div>
            ))}
        </div>
    )
}