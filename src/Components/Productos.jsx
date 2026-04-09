import React from 'react'
import Inventario from '../assets/Imagenes/Inventario.json'

const productos = Inventario.filter(i=> i.departamento=="HIGIENE BUCAL")



export default function Productos() {
  return (
    <div className="Card_group">
      {productos.map(i => (
        <div className="col-md-4" style={{ width: '15rem' }} key={i.id}>
          <div className="card border border-black">            
            <h5 >{i.codigo}</h5>
            <p >{i.descripcion}</p>
            <p >Stock: {i.stock}</p>
            <a href="#" className="btn btn-primary">Detalles</a>
          </div>
        </div>
      ))}
    </div>

  );
}
