import React from 'react'

import FormPOS from '../Form/FormPOS'

export default (props) => {
    const { add, data } = props

    return(
        <div className="container">
            <FormPOS show={true} add={add} barang={data.barang}/>
        </div>
    )
}