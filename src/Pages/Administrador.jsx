import React from 'react'




export default function administrador() {
  return (

    <form>
    <div>Registro De Producto</div>
        <input type="text" placeholder='Codigo del Producto'/>
        <input type="text" placeholder="Nombre del producto"/>
        <input type="number" placeholder="Precio de venta"/>
        <input type="number" placeholder="Precio de compra"/>
        <input type="number" placeholder="Stock"/>
        <input type="text" placeholder="Categoria"/>
        <button type='submit'>Registrar</button>
    </form>
  
  
  
  )
}