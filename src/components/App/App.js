import React, { useState, useEffect } from 'react'
import { fetcher } from "../../helper"

import DaftarAkun from '../Views/DaftarAkun'
import JurnalUmum from '../Views/JurnalUmum'
import BukuBesar from '../Views/BukuBesar'

export default () => {
  const [akun, setAkun] = useState([])
  const [jurnal, setJurnal] = useState([])
  const [barang, setBarang] = useState([])

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
  
  useEffect(()=>{
    // fetcher('akun', 'GET').then(data => console.log(data))
    // fetcher('jurnal', 'GET').then(data => console.log(data))
    // fetcher('barang', 'GET').then(data => console.log(data))
    fetcher('akun', 'GET').then(data => setAkun(data.akun_list))
    fetcher('jurnal', 'GET').then(data => setJurnal(data.jurnal_list))
    fetcher('barang', 'GET').then(data => setBarang(data.barang_list))
  },[])

  return (
    <div className="container-fluid">
      <main>
        <JurnalUmum
          data={{
            akun: akun,
            jurnal: jurnal
          }}
          methods={{
            add: addJurnal
          }}
        />
        <DaftarAkun
          data={akun}
          add={addAkun}
        />
        <BukuBesar
          data={akun}
        />
      </main>
    </div>
  )
}