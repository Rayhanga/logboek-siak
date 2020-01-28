import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { fetcher } from "../../helper"

import brand from '../../static/brand.png'
import './App.css'

import DaftarAkun from '../Views/DaftarAkun'
import Jurnal from '../Views/Jurnal'
import BukuBesar from '../Views/BukuBesar'
import LandingPage from '../Views/LandingPage'
import ManajemenBarang from '../Views/ManajemenBarang'
import PointOfSale from '../Views/PointOfSale'
import Neraca from '../Views/Neraca'

export default () => {
  const [akun, setAkun] = useState([])
  const [jurnal, setJurnal] = useState([])
  const [barang, setBarang] = useState([])
  const [show , setShow] = useState(true)

  const addJurnal = ({uraian, tanggal, details}) => {
    const date = new Date()
    const d = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate()
    const m = date.getMonth() + 1 < 10 ? 0 + (date.getMonth() + 1).toString() : date.getMonth()
    const y = date.getFullYear()

    const h = date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours()
    const min = date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes()
    const s = date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds()
    
    const phTgl = d + '/' + m + '/' + y + ' ' + h + ':' + min + ':' + s

    const newJurnal = {
      uraian: uraian,
      tanggal: phTgl,
      details: details
    }
    
    fetcher('jurnal', 'POST', newJurnal).then(data => setJurnal(data.jurnal_list))

    fetcher('akun', 'GET').then(data => setAkun(data.akun_list))
  }

  const addAkun = (akunBaru) => {
    fetcher('akun', 'POST', akunBaru).then(data => setAkun(data.akun_list))
  }
  
  const addBarang = (barangBaru) => {
    addJurnal({
      uraian: 'Beli Barang (' + barangBaru.nama + ' x ' + barangBaru.stok + ')',
      details:[
        {
          akun_ref: '112',
          nominal: barangBaru.stok * barangBaru.harga_pokok,
          dk: 'D'
        },
        {
          akun_ref: '111',
          nominal: barangBaru.stok * barangBaru.harga_pokok,
          dk: 'K'
        }
      ]
    })
    fetcher('barang', 'POST', barangBaru).then(data => setBarang(data.barang_list))
  }

  const addStokBarang = (barang) => {
    addJurnal({
      uraian: 'Beli Barang (' + barang.nama + ' x ' + barang.stok + ')',
      details:[
        {
          akun_ref: '112',
          nominal: barang.stok * barang.harga_pokok,
          dk: 'D'
        },
        {
          akun_ref: '111',
          nominal: barang.stok * barang.harga_pokok,
          dk: 'K'
        }
      ]
    })
    fetcher('barang/'+barang.id, 'PUT', {stok: barang.stok}).then(data => setBarang(data.barang_list))
  }

  // const addPenjualanBarang = (penjualan) => {
  //   console.log(penjualan)
  //   fetcher('jurnal', 'POST', penjualan).then(data => setJurnal(data.jurnal_list))
  // }

  const updateData = () => {
    setShow(!show)
    fetcher('akun', 'GET').then(data => setAkun(data.akun_list))
    fetcher('barang', 'GET').then(data => setBarang(data.barang_list))
    fetcher('jurnal', 'GET').then(data => setJurnal(data.jurnal_list))
  }
  
  useEffect(()=>{
    // fetcher('akun', 'GET').then(data => console.log(data))
    // fetcher('jurnal', 'GET').then(data => console.log(data))
    // fetcher('barang', 'GET').then(data => console.log(data))
    updateData()
  },[])

  return (
    <Router>
      <div className="container-fluid h-100">
      <div className="row h-100">
        {show &&
        <div className='vertical-menu h-100'>
          <span className="pointer" onClick={() => setShow(!show)}>
            <div className="text-center">
              <img style={{width: '15vh', borderRadius: '25px'}} src={brand}/>
            </div>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/">
              <i className="fa fa-home" style={{fontSize: '24px'}}/> Landing Page
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/jurnal/">
              <i className="fa fa-book" style={{fontSize: '24px'}}/> Jurnal
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/bukubesar/">
              <i className="fa fa-bank" style={{fontSize: '24px'}}/> Buku Besar
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/neraca/">
              <i className="fa fa-balance-scale" style={{fontSize: '24px'}}/> Neraca
            </Link>
          </span> 
          <span onClick={() => updateData()}>
            <Link to="/logboek/pos/">
              <i className="fa fa-money" style={{fontSize: '24px'}}/> <i>Point of Sale</i> (POS)
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/barang/">
              <i className="fa fa-archive" style={{fontSize: '24px'}}/> Manajemen Barang
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link to="/logboek/pengaturan/">
              <i className="fa fa-cog" style={{fontSize: '24px'}}/> Pengaturan
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link>
              <i className="fa fa-refresh" style={{fontSize: '24px'}}/> Perbarui Data
            </Link>
          </span>
        </div>
        }
        <main className="col-12">
        <button className="vm-btn btn" onClick={() => setShow(!show)}>
          <i className="fa fa-align-justify" style={{fontSize: '24px'}}/>
        </button>
          <Switch>
            <Route exact path="/logboek/">
              <LandingPage
                akun={akun}
                barang={barang}
              />
            </Route>
            <Route exact path="/logboek/jurnal/">
              <Jurnal
                data={{
                  akun: akun,
                  jurnal: jurnal
                }}
                methods={{
                  add: addJurnal
                }}
              />
            </Route>
            <Route exact path="/logboek/bukubesar/">
              <BukuBesar
                data={akun}
              />
            </Route>
            <Route exact path="/logboek/pengaturan/">
              <DaftarAkun
                data={akun}
                add={addAkun}
              />
            </Route>
            <Route exact path="/logboek/barang/">
              <ManajemenBarang
                data={{
                  barang: barang,
                  akun: akun
                }}
                methods={{
                  add: addBarang,
                  stk: addStokBarang
                }}
              />
            </Route>
            <Route exact path="/logboek/pos/">
              <PointOfSale
                data={{
                  barang: barang
                }}
                add={addJurnal}
              />
            </Route>
            <Route exact path="/logboek/neraca/">
              <Neraca
                data={{
                  akun: akun,
                  jurnal: jurnal,
                  barang: barang
                }}
                methods={{
                  add: addJurnal
                }}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
    </Router>
    
  )
}