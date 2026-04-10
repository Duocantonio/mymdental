import React from 'react'
import { useEffect, useState } from 'react'

export default function Productos() {
  const [productos, setProductos] = useState([])


useEffect(() => {
    fetch("http://localhost:8080/MyMDentalCommerce/products/clientProducts")
        .then(response => response.json())
        .then(data => setProductos(data))
        .catch(error => console.error(error))

}, [])


return (
  <div className="Card_group">
      {productos.map(productos => (
        <div className="col-md-4" style={{ width: '15rem' }} key={productos.idProduct}>
          <div className="card border border-black">            
            <h5 >{productos.productName}</h5>
            <p >{productos.descriptionProduct}</p>
            <p >Stock: {productos.stockProduct}</p>
            <p >Precio: ${productos.priceProduct}</p>
            <a href="#" className="btn btn-primary">Detalles</a>
          </div>
        </div>
      ))}
    </div>
)
}