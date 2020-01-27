import React, { useState } from 'react'
import { numberSep } from '../../helper'

import FormBeliBarang from "../Form/FormBeliBarang";
import FormBeliStok from '../Form/FormBeliStok';

export default (props) => {
    const [show, setShow] = useState({
        add: false,
        stk: false,
    })

    return(
        <div className="container">
            <h1>Manajemen Barang Dagang</h1>
            <input className="btn btn-primary" type="button" value="Beli Barang Baru" onClick={() => setShow({add: !show.add, stk: false})}/>
            <input className="btn mx-2 btn-primary" type="button" value="Beli Stok Barang" onClick={() => setShow({stk: !show.stk, add: false})}/>
            <FormBeliBarang show={show.add} add={props.methods.add}/>
            <FormBeliStok show={show.stk} add={props.methods.stk} data={props.data.barang}/> 
            {props.data.barang && props.data.barang.map((item) => (
                <div className="m-3 card" key={item.id}>
                    <div className="card-header">
                        <h2>{item.nama}</h2>
                    </div>
                    <div className="card-body">
                        <h3>Harga Pokok: {numberSep(item.harga_pokok)}</h3>
                        <h3>Harga Jual: {numberSep(item.harga_jual)}</h3>
                        <h3>Stok: {item.stok}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}