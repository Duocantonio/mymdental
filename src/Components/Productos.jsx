import React from 'react'
import { useEffect, useState } from 'react'

export default function Productos({ urlBack }) {
  const [productos, setProductos] = useState([])


useEffect(() => {
    fetch(urlBack)
        .then(response => response.json())
        .then(data => setProductos(data))

}, [urlBack])
console.log("URL:", urlBack);

return (
  <div className="Card_group">
      {productos.map(producto => (
        <div className="col-md-4" style={{ width: '15rem' }} key={producto.idProduct}>
          <div className="card border border-black">            
            <h5 >{producto.productName}</h5>
            <p >{producto.descriptionProduct}</p>
            <p >Stock: {producto.stockProduct}</p>
            <p >Precio: ${producto.priceProduct}</p>
            <a href="#" className="btn btn-primary">Detalles</a>
          </div>
        </div>
      ))}
    </div>
)
}