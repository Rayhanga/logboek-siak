import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { fetcher } from "../../helper"

import DaftarAkun from '../Views/DaftarAkun'
import Jurnal from '../Views/Jurnal'
import BukuBesar from '../Views/BukuBesar'

import './App.css'

export default () => {
  const [akun, setAkun] = useState([])
  const [jurnal, setJurnal] = useState([])
  const [barang, setBarang] = useState([])
  const [show , setShow] = useState(false)

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

  const updateData = () => {
    setShow(!show)
    fetcher('akun', 'GET').then(data => setAkun(data.akun_list))
    fetcher('jurnal', 'GET').then(data => setJurnal(data.jurnal_list))
    fetcher('barang', 'GET').then(data => setBarang(data.barang_list))
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
        <div className={show ? 'vertical-menu h-100' : 'd-none'}>
          <span className="pointer" onClick={() => setShow(!show)}><h3>LogBoek</h3></span>
          <span>
            <Link to="/">
              <i className="fa fa-home" style={{fontSize: '24px'}}/> Landing Page
            </Link>
          </span>
          <span>
            <Link to="/jurnal">
              <i className="fa fa-book" style={{fontSize: '24px'}}/> Jurnal
            </Link>
          </span>
          <span>
            <Link to="/bukubesar">
              <i className="fa fa-bank" style={{fontSize: '24px'}}/> Buku Besar
            </Link>
          </span>
          <span>
            <Link to="/pos">
              <i className="fa fa-money" style={{fontSize: '24px'}}/> <i>Point of Sale</i> (POS)
            </Link>
          </span>
          <span>
            <Link to="/barang">
              <i className="fa fa-archive" style={{fontSize: '24px'}}/> Manajemen Barang
            </Link>
          </span>
          <span>
            <Link to="/pengaturan">
              <i className="fa fa-cog" style={{fontSize: '24px'}}/> Pengaturan
            </Link>
          </span>
          <span onClick={() => updateData()}>
            <Link>
              <i className="fa fa-refresh" style={{fontSize: '24px'}}/> Refresh Data
            </Link>
          </span>
        </div>
        <main className="col-12">
        <button className="vm-btn btn" onClick={() => setShow(!show)}>
          <i className="fa fa-align-justify" style={{fontSize: '24px'}}/>
        </button>
      <Switch>
        <Route exact path="/">
          <h1>Hi</h1>
        </Route>
        <Route exact path="/jurnal">
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
        <Route exact path="/bukubesar">
          <BukuBesar
            data={akun}
          />
        </Route>
        <Route exact path="/pengaturan">
          <DaftarAkun
            data={akun}
            add={addAkun}
          />
        </Route>
      </Switch>
        </main>
      </div>
    </div>
    </Router>
    
  )
}