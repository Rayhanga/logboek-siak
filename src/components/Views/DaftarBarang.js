import React, { useState } from 'react'
import { numberSep } from '../../helper'

import FormBarangBaru from "../Form/FormBarangBaru";

export default (props) => {
    const [show, setShow] = useState(false)
    const { add, data } = props

    return(
        <div className="container">
            <h1>Daftar Barang</h1>
            <input className="btn btn-primary" type="button" value="Tambah Barang Baru" onClick={() => setShow(!show)}/>
            <FormBarangBaru show={show} add={add}/>
            {data && data.map((item) => (
                <div className="m-3 card" key={item.id}>
                    <div className="card-header">
                        <h2>{item.nama}</h2>
                    </div>
                    <div className="card-body">
                        <h3>Harga Pokok: {numberSep(item.harga_pokok)}</h3>
                        <h3>Stok: {item.stok}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}