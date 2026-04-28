import React, { useState } from 'react';
import marca1 from "../assets/Imagenes/marca1.png";
import { useDetailsClientProductState } from '../hooks/UseDetailsProduct';
import { useParams } from 'react-router-dom';

export default function Detalles() {

  const {idProduct: id} = useParams()
  const { product, loading, error, errorBody, reloadProductById} = useDetailsClientProductState(id)
  
  if (loading) {
    return(
      <>
      <h1>Cargando producto seleccionado</h1>
      <p>Pro favor espere...</p>
      </>
    );
  }

  if (error){
    return(
      <>
        <h1>Algo salio mal</h1>
        <p>Ocurrio un error al cargar el producto</p>
        <p>code: {errorBody?.code ?? "Unknown"}</p>
        <p>mensaje: {errorBody?.message ?? "Unknown"}</p>
      
      </>
    );
  }
  
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0" key={product.idProduct}>
          <div className="col-md-4">
            <img 
              src={marca1} 
              className="img-fluid rounded-start" 
              alt={product.productName} 
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">
                {product.description_product}
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Actualizado hace 3 min
                </small>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}