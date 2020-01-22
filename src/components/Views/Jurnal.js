import React, { useState } from 'react'

import FormGJ from '../Form/FormGJ'
import FormRJ from '../Form/FormRJ'

export default ({data, methods}) => {
    const [show, setShow] = useState({
        umum: false,
        revisi: false
    })
    const { akun, jurnal } = data ? data : () => {}
    const { add } = methods ? methods : () => {}

    return(
        <div className="container">
            <h1>Jurnal</h1>
            <input className="btn btn-primary" type="button" value="Catat Jurnal Umum" onClick={() => setShow({umum: !show.umum, revisi: false})}/>
            <input className="btn btn-primary mx-2" type="button" value="Catat Jurnal Revisi" onClick={() => setShow({umum: false, revisi: !show.revisi})}/>
            <FormGJ akun={akun} show={show.umum} add={add}/>
            <FormRJ akun={akun} show={show.revisi} add={add}/>
            {jurnal && jurnal.map((item) => (
                <JurnalItem item={item}/>
            ))}
        </div>
    )
}

const JurnalItem = ({item}) => {
    const [show, setShow] = useState(false)
    const { details } = item
    return(
        <div className="card m-3" key={item.id}>
            <div className="card-header">
                <h2>{item.uraian} - {item.tanggal}</h2>
                <input className="btn btn-primary" type="button" value="Lihat Detail" onClick={() => setShow(!show)}/>
                <div className={show ? 'd-block card mx-auto m-3' : 'd-none'}>
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
                    {details && details.map((detail) => (
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
            </div>
        </div>
    )
}