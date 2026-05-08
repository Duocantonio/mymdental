import React, { useEffect, useState } from 'react'
import "../Styles/Productos.css";
import logoImagen from '../assets/Imagenes/Logomym.png';
import { Link } from 'react-router-dom';
import { useCarrito } from '../Components/CartContext';

export default function Productos({ urlBack }) {
  const [productos, setProductos] = useState([])
  const { agregarAlCarrito } = useCarrito();

  const handleAgregarAlCarrito = (producto) => {
    if (productos) {
      agregarAlCarrito({
        idProduct: producto.idProduct,
        productName: producto.productName,
        priceProduct: producto.priceProduct,
        stockProduct: producto.stockProduct,
        cantidad: 1
      })
    }
  }

    useEffect(() => {
  fetch(urlBack)
    .then(response => {
      console.log("STATUS:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("DATA COMPLETA:", data);
      console.log("TIPO DE DATA:", typeof data);
      console.log("ES ARRAY:", Array.isArray(data));
      console.log("PRIMER ELEMENTO:", data[0]);
      setProductos(data);
    })
    .catch(error => console.error("ERROR:", error));
}, [urlBack]);



  return (
    <div className="row row-cols-1 row-cols-md-4 g-4 container mx-auto">
      {[...productos].sort(() => Math.random() - 0.5).slice(0, 12).map(producto => (
        <div className="col" key={producto.idProduct}>
          <div className="card h-100 border border-black shadow-sm">
            <img 
              src={logoImagen}
              className="card-img-top" 
              alt={producto.productName} 
            />
            
            <div className="card-body">
              <h5 className="card-title fw-bold">{producto.productName}</h5>
              <p className="card-text text-muted">
                {producto.descriptionProduct}
              </p>
              <p className="card-text fw-bold text-primary">
                Precio: ${producto.priceProduct}
              </p>
            </div>

            <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center">
              <small className="text-muted">Stock: {producto.stockProduct}</small>
              <Link to={`/producto/${producto.idProduct}`} className="btn btn-sm btn-outline-primary">
                Detalles
              </Link>           
            </div>

            <button
              className="btn btn-sm btn-primary w-100"
              onClick={() => handleAgregarAlCarrito(producto)}
            >
              Añadir al carro socio
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}