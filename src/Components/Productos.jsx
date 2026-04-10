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
    <div>
        <h1>Productos</h1>
        <ul>
            {productos.map((producto) => (
                <li key={producto.id}>{producto.nombre} - ${producto.precio}</li>
            ))}
        </ul>
    </div>
)
}