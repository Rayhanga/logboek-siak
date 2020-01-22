import React, { useState } from 'react'

import FormBukuBesar from '../Form/FormBukuBesar'

import { numberSep } from '../../helper'

export default (props) => {
    const [akun, setAkun] = useState(null)

    const select = (data) => {
        const {details, nama, ref} = props.data.filter((akun) => (akun.ref === data.ref))[0]
        const fd = details.filter((detail) => (new Date(detail.tanggal) <= new Date(data.tmax) && new Date(detail.tanggal) >= new Date(data.tmin)))
        var i, sum = 0
        for(i in fd){
            switch (ref.charAt(0)) {
                case '1':
                    sum = fd[i].dk === 'D' ? sum + fd[i].nominal : sum - fd[i].nominal
                    break
                case '2':
                    sum = fd[i].dk === 'K' ? sum + fd[i].nominal : sum - fd[i].nominal
                    break
                case '3':
                    sum = fd[i].dk === 'K' ? sum + fd[i].nominal : sum - fd[i].nominal
                    break
                case '4':
                    sum = fd[i].dk === 'K' ? sum + fd[i].nominal : sum - fd[i].nominal
                    break
                default:
                    sum = fd[i].dk === 'D' ? sum + fd[i].nominal : sum - fd[i].nominal
                    break
            }
        }
        setAkun({
            ref: ref,
            nama: nama,
            details: fd,
            periode: data.tmin + ' sampai ' + data.tmax,
            sum: sum
        })
    }

    return(
        <div className="container">
            <FormBukuBesar
                data={props.data}
                select={select}
            />
            {akun && 
                <div className="m-3 card">
                    <div className="card-header">
                        <h2>{akun.nama} - {akun.ref}</h2>
                        <small className="lead">Periode: {akun.periode}</small>
                    </div>
                    <div className="card-body">
                        <div className="card-body mx-3">
                            <div className="row border">
                                <div className="col-2 border text-left">
                                    <h5>Tanggal</h5>
                                </div>
                                <div className="col-6 border text-left">
                                    <h5>Uraian</h5>
                                </div>
                                <div className="col-2 border text-left">
                                    <h5>Debit</h5>
                                </div>
                                <div className="col-2 border text-left">
                                    <h5>Kredit</h5>
                                </div>
                            </div>
                        {akun.details && akun.details.map((detail) => (
                            <div className="row border">
                                <div className="col-2 border text-left">
                                    {detail.tanggal}
                                </div>
                                <div className="col-6 border text-left">
                                    {detail.uraian}
                                </div>
                                <div className="col-2 border text-right">
                                    {detail.dk === 'D' ? numberSep(detail.nominal) : () => {}}
                                </div>
                                <div className="col-2 border text-right">
                                    {detail.dk === 'K' ? numberSep(detail.nominal) : () => {}}
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className="mx-3 card card-body">
                            <div className="row">
                                <div className="col">
                                    <h3>
                                        Saldo Akhir:
                                    </h3>
                                </div>
                                <div className="col text-right lead">
                                    {numberSep(akun.sum)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}