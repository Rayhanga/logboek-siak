import React, { useMemo } from 'react'
import { Chart } from 'react-charts'

export default (props) => {
    return(
        <div className="container">
            <h1>Halaman Utama</h1>
            <div className="row">
                <div className="col">
                    <Item title="Saldo Akun" data={props.data.akun}/>
                </div>
                {/* <div className="col-4">
                    <Item title=""/>
                </div> */}
            </div>
        </div>
    )
}

const Item = (props) => {
    const { data } = props.data ? props : () => {}

    const chartData = useMemo(() => [
        {
            label: "Test",
            data: [[0,0],[1,3], [4,3],[2,5]]
        }
    ]
    ,[])

    console.log(chartData)

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
                    style={{
                        width: '',
                        height: '300px'
                    }}
                >
                    {/* <h1>*Masukkan Grafik Disini*</h1> */}
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