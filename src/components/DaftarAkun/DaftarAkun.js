import React from "react"

export default ({data}) => {
    return <DaftarAkun data={data}/>
}

const DaftarAkun = ({data}) => {
    return (
        <table className="table">
            <caption style={{captionSide: "top", color: "black"}}>
                <h1>Daftar Akun</h1>
            </caption>
            <thead>
                <tr>    
                    <th>Ref</th>
                    <th>Nama</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((item) => (
                    <tr key={item.ref}>
                        <td>{item.ref}</td>
                        <td>{item.nama}</td>
                    </tr>
                ))}
            </tbody>
        </table>)
}


// const Item = ({data}) => {
//     const value = Object.values(data)
//     return(
//         <tr>{value.map((value) => (<td key={value.id ? value.id : value.ref}>{value}</td>))}</tr>  
//     )
// }

// const Head = ({data}) => {
//     const key = Object.keys(data)
//     return(
//         <>{key.map((key, index) => (<th key={index}>{key.replace(/^\w/, c => c.toUpperCase())}</th>))}</>
//     )
// }