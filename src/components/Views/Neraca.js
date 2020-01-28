import React, { useState } from 'react'
import { numberSep, formatDate } from '../../helper'

export default (props) => {
    const [tb, setTB] = useState(false)

    const { methods, data } = props ? props : null

    const { akun } = data ? data : null
    const { add } = methods ? methods : null

    var saldoAktiva = 0
    var saldoModal = 0
    var saldoPenjualan = 0
    var saldoHpp = 0
    var saldoBiaya = 0

    const aktiva = akun.filter(a => a.ref.charAt(0) === '1')
    const modal = akun.filter(a => a.ref.charAt(0) === '3')
    const penjualan = akun.filter(a => a.ref.charAt(0) === '4')
    const hpp = akun.filter(a => a.ref.charAt(0) === '5')
    const biaya = akun.filter(a => a.ref.charAt(0) === '6')

    const akunLD = akun.find(a => a.ref === '312')

    aktiva.forEach(a => saldoAktiva = saldoAktiva + a.saldo) 
    modal.forEach(a => saldoModal = saldoModal + a.saldo) 
    penjualan.forEach(a => saldoPenjualan = saldoPenjualan + a.saldo)
    hpp.forEach(a => saldoHpp = saldoHpp + a.saldo)
    biaya.forEach(a => saldoBiaya = saldoBiaya + a.saldo)

    var labaKotor = -1 * (saldoPenjualan + saldoHpp)
    var labaBerjalan = labaKotor - saldoBiaya
    var labaDitahan = 0

    if(tb){
        labaDitahan = labaKotor - saldoBiaya
        labaBerjalan = 0
    } 

    // console.log(labaDitahan)

    const handleSubmit = (event) => {
        var b = [
            {
                akun_ref: '311',
                nominal: labaDitahan,
                dk: 'K'
            }
        ]
        penjualan.forEach(p => b =  [...b, {
            akun_ref: p.ref,
            nominal: -1 * p.saldo,
            dk: 'D'
        }])
        hpp.forEach(p => b = [...b, {
            akun_ref: p.ref,
            nominal: p.saldo,
            dk: 'K'
        }])
        biaya.forEach(p => b = [...b, {
            akun_ref: p.ref,
            nominal: p.saldo,
            dk: 'K'
        }])

        // const det = [...balance]
        // console.log(b)

        const res = {
            uraian: 'Tutup Buku (' + formatDate(Date.now()) + ')',
            details: b
        }
        // console.log(res)
        add(res)
        setTB(!tb)
        event.preventDefault()
    }

    return(
        <div className="container">
            <div className="d-block card mx-auto m-3">
                <div className="card-header">
                    <h1>Neraca</h1>
                </div>
                <div className="card-body">
                    <form className="form m-3" onSubmit={(e) => handleSubmit(e)}>
                        <div className="row border">
                            <div className="col-4 border text-left">
                                <h5>Akun</h5>
                            </div>
                            <div className="col-8 border text-left">
                                <h5>Nominal</h5>
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-12 border text-left">
                                <h5>Aktiva</h5>
                            </div>
                        </div>
                        {aktiva && aktiva.map((a) => (
                            <div className="row border">
                                <div className="col-4 border text-left">
                                    {a.nama}
                                </div>
                                <div className="col-8 border text-right">
                                    Rp.{numberSep(a.saldo)}
                                </div>
                            </div>
                        ))}
                        <div className="row border">
                            <div className="col-4 border text-left">
                                
                            </div>
                            <div className="col-8 border text-right">
                                <b>Rp.{saldoAktiva && numberSep(saldoAktiva)}</b>
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-12 border text-left">
                                <h5>Pasiva</h5>
                            </div>
                        </div>
                        {modal && modal.map((a) => (
                            <div className="row border">
                                <div className="col-4 border text-left">
                                    {a.nama}
                                </div>
                                <div className="col-8 border text-right">
                                    Rp.{numberSep(-1 * a.saldo)}
                                </div>
                            </div>
                        ))}
                        <div className="row border">
                            <div className="col-4 border text-left">
                                {labaDitahan >= 0 ? 'Laba' : 'Rugi'} Ditahan
                            </div>
                            <div className="col-8 border text-right">
                                Rp.{numberSep(labaDitahan)}
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-4 border text-left">
                                {labaBerjalan >= 0 ? 'Laba' : 'Rugi'} Berjalan
                            </div>
                            <div className="col-8 border text-right">
                                Rp.{numberSep(labaBerjalan)}
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-4 border text-left">
                                
                            </div>
                            <div className="col-8 border text-right">
                                <b>Rp.{saldoModal && numberSep(-1*saldoModal + labaBerjalan + labaDitahan)}</b>
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-12 border text-left">
                                <h5>Penjualan</h5>
                            </div>
                        </div>
                        {penjualan && penjualan.map((a) => (
                            <div className="row border">
                                <div className="col-4 border text-left">
                                    {a.nama}
                                </div>
                                <div className="col-8 border text-right">
                                    Rp.{!tb && numberSep(-1*a.saldo)}
                                    {tb && numberSep(0)}
                                </div>
                            </div>
                        ))}
                        {hpp && hpp.map((a) => (
                            <div className="row border">
                                <div className="col-4 border text-left">
                                    {a.nama}
                                </div>
                                <div className="col-8 border text-right">
                                    Rp.{!tb && numberSep(a.saldo)}
                                    {tb && numberSep(0)}
                                </div>
                            </div>
                        ))}
                        <div className="row border">
                            <div className="col-4 border text-left">
                                <b>Laba Kotor</b>
                            </div>
                            <div className="col-8 border text-right">
                                <b>Rp.{labaKotor && !tb && numberSep(labaKotor)}</b>
                            </div>
                        </div>
                        {biaya && biaya.map((a) => (
                            <div className="row border">
                                <div className="col-4 border text-left">
                                    {a.nama}
                                </div>
                                <div className="col-8 border text-right">
                                    Rp.{!tb && numberSep(a.saldo)}
                                    {tb && numberSep(0)}
                                </div>
                            </div>
                        ))}
                        <div className="row border">
                            <div className="col-4 border text-left">
                                <b>Laba Bersih</b>
                            </div>
                            <div className="col-8 border text-right">
                                <b>Rp.{labaBerjalan && !tb && numberSep(labaBerjalan)}</b>
                            </div>
                        </div>
                        <input
                            className={!tb ? 'mt-3 btn btn-primary' : 'd-none'}
                            type="button"
                            value="Tutup Buku"
                            onClick={() => setTB(true)}
                        />
                        <input
                            className={tb ? 'mt-3 btn btn-primary' : 'd-none'}
                            type="button"
                            value="Cancel"
                            onClick={() => setTB(false)}
                        />
                        <input
                            className={tb ? 'mt-3 mx-3 btn btn-primary' : 'd-none'}
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>          
        </div>
    )
}