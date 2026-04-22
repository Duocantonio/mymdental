import React, { useState, useEffect } from 'react';
import marca1 from "../assets/Imagenes/marca1.png";

export default function Detalles({ urlBack }) {
  const [productoD, setProductoD] = useState([]);

  useEffect(() => {
    fetch(urlBack)
      .then(response => response.json())
      .then(data => setProductoD(data));
  }, [urlBack]);

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      {productoD.map(productos => (
        <div className="row g-0" key={productos.id}>
          <div className="col-md-4">
            <img 
              src={marca1} 
              className="img-fluid rounded-start" 
              alt={productos.productName} 
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{productos.productName}</h5>
              <p className="card-text">
                {productos.description_product}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Actualizado hace 3 min
                </small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}