import React, { useMemo, useState, useEffect } from 'react'
import { Chart } from 'react-charts'
import { fetcher } from '../../helper'

export default (props) => {
    console.log(props)
    return(
        <div className="container">
            <h1>Halaman Utama</h1>
            <div className="row">
                <div className="col-12 m-3">
                    <ChartSaldo title="Saldo Akun Kas" dataset={props.akun}/>
                </div>
                <div className="col-12 m-3">
                    <ChartBarang title="Stok Barang" dataset={props.barang}/>
                </div>
            </div>
        </div>
    )
}

const ChartSaldo = (props) => {
    const { dataset } = props.dataset ? props : () => {}

    const chartData = useMemo(() => {
        const res = dataset.filter(a => a.ref.charAt(0) === '1')

        var x
        for(x in res){
            res[x] = [
                res[x].nama,
                res[x].saldo
            ]
        }
        // console.log(res)
        return [{
            label: 'Saldo Akhir',
            data: res
        }]
    })

    const series = useMemo(
        () => ({
        type: 'bar'
      }),
      []
    )
     
    const axes = useMemo(
    () => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ],
    []
    )

    return(
        <div className="card">
            <div className="card-header">
                <h3>{props.title}</h3>
            </div>
            <div className="card-body">
                <div
                    className="m-3"
                    style={{
                        height: '30vh'
                    }}
                >
                {props.tipe === 'saldo'}
                    <Chart 
                        data={chartData}
                        axes={axes} 
                        series={series}
                        tooltip/>
                </div>
            </div>
        </div>
    )
}

const ChartBarang = (props) => {
    const { dataset } = props.dataset ? props : () => {}
    // const [dataset, setDataset] = useState([])

    console.log(dataset)

    // useEffect(() => {
    //     fetcher('barang', 'GET').then(data => setDataset(data.barang_list))
    // }, [dataset])

    const chartData = useMemo(() => {
        const res = dataset
        console.log(res, dataset)

        var x
        for(x in res){
            res[x] = [
                res[x].nama,
                res[x].stok
            ]
        }
        return [{
            label: 'Stok Akhir',
            data: res
        }]
    })

    const series = useMemo(
        () => ({
        type: 'bar'
      }),
      []
    )
     
    const axes = useMemo(
    () => [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ],
    []
    )

    return(
        <div className="card">
            <div className="card-header">
                <h3>{props.title}</h3>
            </div>
            <div className="card-body">
                <div
                    className="m-3"
                    style={{
                        height: '30vh'
                    }}
                >
                {props.tipe === 'saldo'}
                    <Chart 
                        data={chartData}
                        axes={axes} 
                        series={series}
                        tooltip/>
                </div>
            </div>
        </div>
    )
}