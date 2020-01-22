import React, { useState, useEffect } from 'react'
import { fetcher } from "../../helper"

import DaftarAkun from '../Views/DaftarAkun'
import JurnalUmum from '../Views/JurnalUmum'
import BukuBesar from '../Views/BukuBesar'

export default () => {
  const [state, setState] = useState({
    akunList: [],
    jurnalList: [],
    barangList: [],
  })

  const addJurnal = (uraian, details, tanggal) => {
    const date = new Date()
    const d = date.getDate() < 10 ? 0 + date.getDate().toString() : date.getDate()
    const m = date.getMonth() + 1 < 10 ? 0 + (date.getMonth() + 1).toString() : date.getMonth()
    const y = date.getFullYear()

    const h = date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours()
    const min = date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes()
    const s = date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds()
    
    const phTgl = d + '/' + m + '/' + y + ' ' + h + ':' + min + ':' + s
    
    fetcher('jurnal', 'POST', {
      uraian: uraian,
      tanggal: phTgl,
      details: details
    }).then(data => setState({
      akunList: state.akunList,
      jurnalList: data.jurnal_list,
      barangList: state.barangList,
    }))

    fetcher('akun', 'GET').then(data => setState({
      akunList: data.akun_list,
      jurnalList: state.jurnalList,
      barangList: state.barangList,
    }))
  }

  const addAkun = (ref, nama) => {
    fetcher('akun', 'POST', {
      ref: ref,
      nama: nama
    }).then(data => setState({
      akunList: data.akun_list,
      jurnalList: state.jurnalList,
      barangList: state.barangList,
    }))
  }
  
  useEffect(()=>{
    fetcher('akun', 'GET').then(data => console.log(data))
    fetcher('jurnal', 'GET').then(data => console.log(data))
    fetcher('barang', 'GET').then(data => console.log(data))
    // fetcher('akun', 'GET').then(data => setState({
      // akunList: data.akun_list,
      // jurnalList: state.jurnalList,
      // barangList: state.barangList,
    // })
    // fetcher('jurnal', 'GET').then(data => setState({
      // akunList: state.akunList,
      // jurnalList: data.jurnal_list,
      // barangList: state.barangList,
    // }))
    // fetcher('barang', 'GET').then(data => setState({
      // akunList: state.akunList,
      // jurnalList: state.jurnalList,
      // barangList: data.barang_list,
    // }))
  },[])

  return (
    <div className="container-fluid">
      <main>
        <JurnalUmum
          data={{
            akun: state.akunList,
            jurnal: state.jurnalList
          }}
          methods={{
            add: addJurnal
          }}
        />
        <DaftarAkun
          data={state.akunList}
          add={addAkun}
        />
        <BukuBesar
          data={state.akunList}
        />
      </main>
    </div>
  )
}