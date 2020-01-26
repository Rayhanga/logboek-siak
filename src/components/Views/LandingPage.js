import React, { useMemo, useState, useEffect } from 'react'
import { Chart } from 'react-charts'

export default (props) => {
    return(
        <div className="container">
            <h1>Halaman Utama</h1>
            <div className="row">
                <div className="col">
                    <Item title="Saldo Akun Kas" dataset={props.data.akun}/>
                </div>
                {/* <div className="col-4">
                    <Item title=""/>
                </div> */}
            </div>
        </div>
    )
}

const Item = (props) => {
    const { dataset } = props.dataset ? props : () => {}

    const lut = [
        'D', 'K', 'K'
    ]

    const dataSaldo = useMemo(() => {
        const res = []
        var x, sum = 0
        for(x in dataset){
            var y = 0, sum = 0
            for(y in dataset[x].details){
                sum = dataset[x].details[y].dk === lut[dataset[x].ref.charAt(0)-1] ? sum + dataset[x].details[y].nominal : sum - dataset[x].details[y]
            }
            sum = isNaN(sum) ? 0 : sum
            let foo
            dataset[x].ref.charAt(0) === '1'
            ? res.push([
                dataset[x].nama, sum
            ])
            : foo = NaN
        }
        return [{
            label: 'Saldo Akhir',
            data: res
        }]
    })

    // console.log(dataSaldo)

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
                    <Chart 
                        data={dataSaldo}
                        axes={axes} 
                        series={series}
                        tooltip/>
                </div>
            </div>
        </div>
    )
}