import React, { useState } from 'react'

import FormPOS from '../Form/FormPOS'

export default (props) => {
    const [show, setShow] = useState(false)
    const { add, data } = props

    return(
        <div className="container">
            <h1>Point of Sale</h1>
            <input className="btn btn-primary" type="button" value="Catat Penjualan" onClick={() => setShow(!show)}/>
            <FormPOS show={show} add={add}/>
        </div>
    )
}