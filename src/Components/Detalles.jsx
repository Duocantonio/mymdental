import React from 'react';
import marca1 from "../assets/Imagenes/marca1.png";
import { useParams } from 'react-router-dom';

export default function Detalles() {
    const { idProduct } = useParams();
    
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={marca1} 
            className="img-fluid rounded-start" 
            alt="Descripción de la imagen" 
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Título de la Tarjeta</h5>
            <p className="card-text">
              Esta es una tarjeta más amplia con texto de apoyo debajo como introducción natural a contenido adicional.
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Actualizado hace 3 min</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}