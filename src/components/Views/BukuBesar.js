import React, { useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
            periode: data.tmin + ' : ' + data.tmax,
            sum: sum
        })
    }

    const printPDF = (akun) => {
        const {nama, periode} = akun
		const filename  = nama+'_'+periode+'.pdf'

		html2canvas(document.querySelector('#bukuBesar'),{scale:1}).then(canvas => {
			let pdf = new jsPDF('l', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, pdf.internal.pageSize.getHeight()/4, pdf.internal.pageSize.getWidth(), 0);
			pdf.save(filename);
		});
    }

    return(
        <div className="container">
            <FormBukuBesar
                data={props.data}
                select={select}
            />
            {akun && 
                <div className="m-3 card" id="bukuBesar">
                    <div className="card-header">
                        <h2>{akun.nama}</h2>
                        <small className="lead">Periode: {akun.periode.replace(/-/gi, '/')}</small>
                    </div>
                    <div className="card-body">
                        <div className="card-body mx-3">
                            {akun.details && akun.details.length > 0 &&
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
                            }
                            {akun.details && akun.details.length === 0 &&
                            <div className="row border h-100">
                                <div className="col border text-center h-100">
                                    <h3>Tidak ada catatan pada periode ini</h3>
                                </div>
                            </div>
                            }
                        {akun.details && akun.details.length > 0 && akun.details.map((detail) => (
                            <div className="row border">
                                <div className="col-2 border text-left">
                                    {detail.tanggal.substring(8,10)}{detail.tanggal.match(/-[0-9]{2}-/)}{detail.tanggal.match(/^[0-9]{4}/)}
                                </div>
                                <div className="col-6 border textleft">
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
                        {akun.details && akun.details.length > 0 &&
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
                        }
                    </div>
                </div>
            }
        {akun &&
            <input disabled={akun.details.length === 0} onClick={() => printPDF(akun)} className="btn btn-primary btn-block m-3" type="button" value="Print"/>
        }
        </div>
    )
}