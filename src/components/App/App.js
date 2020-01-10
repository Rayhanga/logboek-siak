import React from 'react'
import { fetcher } from "../../helper"


import BukuBesar from '../BukuBesar'
import JurnalUmum from '../JurnalUmum'

class App extends React.Component {
  state = {
    akunList: [],
    jurnalList: []
  }

  addJurnal = (uraian, details, tanggal) => {
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
    }).then(data => this.setState({jurnalList: data.jurnal_list}))

    fetcher('akun', 'GET').then(data => this.setState({akunList: data.akun_list}))
  }

  addAkun = (ref, nama) => {
    fetcher('akun', 'POST', {
      ref: ref,
      nama: nama
    }).then(data => this.setState({akunList: data.akun_list}))
  }
  
  componentDidMount(){
    fetcher('akun', 'GET').then(data => this.setState({akunList: data.akun_list}))
    fetcher('jurnal', 'GET').then(data => this.setState({jurnalList: data.jurnal_list}))
  }

  render(){
    return (
      <div className="container-fluid">
        <header>
          <BukuBesar
            data={this.state.akunList}
            methods={{
              add: this.addAkun
            }}
          />
          <JurnalUmum
            data={{
              akun: this.state.akunList,
              jurnal: this.state.jurnalList
            }}
            methods={{
              add: this.addJurnal
            }}
          />
        </header>
      </div>
    )
  }
}

export default App