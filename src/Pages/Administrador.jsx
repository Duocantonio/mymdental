import React, { useState } from 'react';
import '../Styles/Administrador.css';

export default function Administrador() {

  const [codeProduct, setCodeProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [costPriceProduct, setCostPriceProduct] = useState("");
  const [stockProduct, setStockProduct] = useState("");
  const [criticProduct, setCriticProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [nameDepartment, setNameDepartment] = useState("");







  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      codeProduct,
      productName,
      priceProduct,
      costPriceProduct,
      stockProduct,
      criticProduct,
      descriptionProduct,
      nameDepartment
    };

    fetch("http://localhost:8080/MyMDentalCommerce/products/saveProduct", {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoProducto)
    })
    .then(response => {
      if(response.ok){
        alert("Producto registrado exitosamente");
      } else {
        alert("Error al registrar el producto");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    });
  };

  

  const eliminarProducto = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/MyMDentalCommerce/products/deleteProduct/${productName}`, {
      method: 'DELETE'
    })
    .then(response => {
      if(response.ok){
        alert("Producto eliminado exitosamente");
      } else {
        alert("Error al eliminar el producto");
      } 
  })}


  const actualizarProducto = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/MyMDentalCommerce/products/editProduct/${productName}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        codeProduct,
        productName,
        priceProduct,
        costPriceProduct,
        stockProduct,
        criticProduct,
        descriptionProduct,
        nameDepartment
      })

    })
    .then(response => {
      if(response.ok){
        alert("Producto actualizado exitosamente");
      } else {
        alert("Error al actualizar el producto");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        
        <input 
          type="text" 
          placeholder="Código del Producto" 
          value={codeProduct} 
          onChange={(e) => setCodeProduct(e.target.value)} 
          required 
        />
        
        <input 
          type="text" 
          placeholder="Nombre del producto" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />
        
        <input 
          type="number" 
          placeholder="Precio de venta" 
          value={priceProduct} 
          onChange={(e) => setPriceProduct(e.target.value)} 
          required 
        />
      
        <input 
          type="number" 
          placeholder="Precio de compra" 
          value={costPriceProduct} 
          onChange={(e) => setCostPriceProduct(e.target.value)} 
          required 
        />
        
        <input 
          type="number" 
          placeholder="Stock inicial" 
          value={stockProduct} 
          onChange={(e) => setStockProduct(e.target.value)} 
          required 
        />

        <input 
          type="number" 
          placeholder="Stock crítico" 
          value={criticProduct} 
          onChange={(e) => setCriticProduct(e.target.value)} 
        />
        <input
        type='text'
        placeholder='indique la categoria'
        value={nameDepartment}
        onChange={(e) => setNameDepartment(e.target.value)}
        />
        <textarea 
          placeholder="Descripción" 
          value={descriptionProduct} 
          onChange={(e) => setDescriptionProduct(e.target.value)} 
        />
        <button type='submit' className='btn'>Registrar producto</button>
      </form>
      <form onSubmit={eliminarProducto} className='form'>
        <input 
          type="text"
          placeholder="Nombre del producto a eliminar"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <button type='submit' className='btn'>Eliminar producto</button>
      </form>



      <form onSubmit={actualizarProducto} className='form'>
        <input 
          type="text" 
          placeholder="Nombre del Producto a actualizar" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />

        <input 
          type="text" 
          placeholder="Nuevo código del Producto"
          value={codeProduct}
          onChange={(e) => setCodeProduct(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Nuevo precio de venta"
          value={priceProduct}
          onChange={(e) => setPriceProduct(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Nuevo precio de compra"
          value={costPriceProduct}
          onChange={(e) => setCostPriceProduct(e.target.value)} 
        /> 

        <input 
          type="number" 
          placeholder="Nuevo stock inicial"
          value={stockProduct}
          onChange={(e) => setStockProduct(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Nuevo stock crítico"
          value={criticProduct}
          onChange={(e) => setCriticProduct(e.target.value)} 
        />

        <input
        type='text'
        placeholder='indique la nueva categoria'
        value={nameDepartment}
        onChange={(e) => setNameDepartment(e.target.value)}
        />

        <textarea 
          placeholder="Nueva descripción" 
          value={descriptionProduct} 
          onChange={(e) => setDescriptionProduct(e.target.value)} 
        />

        <button type='submit' className='btn'>Actualizar producto</button>
      </form>
    </>
  );
}