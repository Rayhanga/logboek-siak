import React, { useState, useEffect } from 'react'
import { fetcher } from "../../helper"

import DaftarAkun from '../Views/DaftarAkun'
import JurnalUmum from '../Views/JurnalUmum'

export default () => {
  const [akunList, setAL] = useState([])
  const [jurnalList, setJL] = useState([])

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
    }).then(data => setAL(data.jurnal_list))

    fetcher('akun', 'GET').then(data => setAL(data.akun_list))
  }

  const addAkun = (ref, nama) => {
    fetcher('akun', 'POST', {
      ref: ref,
      nama: nama
    }).then(data => setAL(data.akun_list))
  }
  
  useEffect(()=>{
    fetcher('akun', 'GET').then(data => setAL(data.akun_list))
    fetcher('jurnal', 'GET').then(data => setJL(data.jurnal_list))
  },[])

  return (
    <div className="container-fluid">
      <main>
        {/* <JurnalUmum
          data={{
            akun: akunList,
            jurnal: jurnalList
          }}
          methods={{
            add: addJurnal
          }}
        /> */}
        <DaftarAkun
          data={akunList}
          add={addAkun}
        />
      </main>
    </div>
  )
}