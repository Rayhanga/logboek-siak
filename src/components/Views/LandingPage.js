import React from 'react'

export default (props) => {
    return(
        <div className="container">
            <h1>Halaman Utama</h1>
            <div className="row">
                <div className="col-8">
                    <Item title=""/>
                </div>
                <div className="col-4">
                    <Item title=""/>
                </div>
            </div>
        </div>
    )
}

const Item = (props) => {
    return(
        <div className="card">
            <div className="card-header">
                <h3>{props.title}</h3>
            </div>
            <div className="card-body">

            </div>
        </div>
    )
}