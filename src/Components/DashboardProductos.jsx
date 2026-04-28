import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';
import logoImagen from '../assets/Imagenes/Logomym.png';


const INITIAL_FORM = {
  codeProduct: "",
  productName: "",
  priceProduct: "",
  costPriceProduct: "",
  stockProduct: "",
  criticProduct: "",
  nameDepartment: "",
  descriptionProduct: ""
};

export default function Trabajador({ urlBack }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [updateForm, setUpdateForm] = useState(INITIAL_FORM);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(urlBack)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProductos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
        setLoading(false);
      });
  }, [urlBack]);

  const handleChange = (setter) => (e) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${urlBack}/saveProduct`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        alert("Producto registrado exitosamente");
        setFormData(INITIAL_FORM);
        setProductos(prev => [...prev, data]);
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Error de conexión con el servidor");
      });
  };

  const actualizarProducto = (e) => {
    e.preventDefault();
    fetch(`${urlBack}/editProduct/${updateForm.productName}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateForm)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        alert("Producto actualizado exitosamente");
        setUpdateForm(INITIAL_FORM);
        // Refrescar lista
        return fetch(urlBack).then(r => r.json());
      })
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Error:", err);
        alert("Error de conexión con el servidor");
      });
  };



  const eliminarProducto = (codeProduct) => {
    if (!window.confirm("¿Confirma que desea eliminar este producto?")) return;

    fetch(`${urlBack}/deleteProduct/${codeProduct}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        alert("Producto eliminado exitosamente");
        setProductos(prev => prev.filter(p => p.codeProduct !== codeProduct));
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Error de conexión con el servidor");
      });
  };

  const seleccionarParaEditar = (p) => {
    setUpdateForm({
      codeProduct: p.codeProduct,
      productName: p.productName,
      priceProduct: p.priceProduct,
      costPriceProduct: p.costPriceProduct,
      stockProduct: p.stockProduct,
      criticProduct: p.criticProduct,
      nameDepartment: p.nameDepartment,
      descriptionProduct: p.descriptionProduct
    });
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Productos</h2>
        <input type="text" placeholder="Buscar por nombre" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="product-list">
          {loading && <p className="text-muted">Cargando productos...</p>}
          {error   && <p className="text-danger">{error}</p>}
          {!loading && !error && productos.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase())).map((p) => (
            <div
              key={p.codeProduct}
              className="product-card"
              onClick={() => seleccionarParaEditar(p)} 
              style={{ cursor: 'pointer' }}
            >
                <img
                  src={logoImagen}
                  className="card-img-top"
                  alt={p.productName}
                />
              <h4>{p.productName}</h4>
              <p>${p.priceProduct}</p>
              <span className={p.stockProduct <= p.criticProduct ? 'low-stock' : ''}>
                Stock: {p.stockProduct}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* Formulario CREAR */}
        <h1>Registrar Producto</h1>
        <form onSubmit={handleSubmit} className="form">
          <input name="codeProduct"        placeholder="Código"         value={formData.codeProduct}        onChange={handleChange(setFormData)} required />
          <input name="productName"        placeholder="Nombre"         value={formData.productName}        onChange={handleChange(setFormData)} required />
          <input name="priceProduct"       placeholder="Precio Venta"   value={formData.priceProduct}       onChange={handleChange(setFormData)} required type="number" />
          <input name="costPriceProduct"   placeholder="Precio Compra"  value={formData.costPriceProduct}   onChange={handleChange(setFormData)} required type="number" />
          <input name="stockProduct"       placeholder="Stock"          value={formData.stockProduct}       onChange={handleChange(setFormData)} required type="number" />
          <input name="criticProduct"      placeholder="Stock Crítico"  value={formData.criticProduct}      onChange={handleChange(setFormData)} type="number" />
          <input name="nameDepartment"     placeholder="Categoría"      value={formData.nameDepartment}     onChange={handleChange(setFormData)} />
          <textarea name="descriptionProduct" placeholder="Descripción" value={formData.descriptionProduct} onChange={handleChange(setFormData)} />
          <button className="btn">Registrar producto</button>
        </form>

        {/* Formulario ACTUALIZAR */}
        <h1>Actualizar Producto</h1>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          💡 Haz click en un producto del panel izquierdo para precargarlo
        </p>
        <form onSubmit={actualizarProducto} className="form">
          <input name="productName"        placeholder="Nombre a actualizar"  value={updateForm.productName}        onChange={handleChange(setUpdateForm)} required />
          <input name="codeProduct"        placeholder="Nuevo código"         value={updateForm.codeProduct}        onChange={handleChange(setUpdateForm)} />
          <input name="priceProduct"       placeholder="Nuevo precio venta"   value={updateForm.priceProduct}       onChange={handleChange(setUpdateForm)} type="number" />
          <input name="costPriceProduct"   placeholder="Nuevo precio compra"  value={updateForm.costPriceProduct}   onChange={handleChange(setUpdateForm)} type="number" />
          <input name="stockProduct"       placeholder="Nuevo stock"          value={updateForm.stockProduct}       onChange={handleChange(setUpdateForm)} type="number" />
          <input name="criticProduct"      placeholder="Nuevo stock crítico"  value={updateForm.criticProduct}      onChange={handleChange(setUpdateForm)} type="number" />
          <input name="nameDepartment"     placeholder="Nueva categoría"      value={updateForm.nameDepartment}     onChange={handleChange(setUpdateForm)} />
          <textarea name="descriptionProduct" placeholder="Nueva descripción" value={updateForm.descriptionProduct} onChange={handleChange(setUpdateForm)} />
          <button className="btn">Actualizar producto</button>
        </form>

          <h1>Eliminar Producto</h1>
          <form onSubmit={eliminarProducto} className='form'>
        <input 
          type="text" 
          placeholder="Código del Producto a eliminar" 
          value={updateForm.codeProduct} 
          onChange={(e) => setUpdateForm(prev => ({ ...prev, codeProduct: e.target.value }))} 
          required 
        />
        <button type='submit' className='btn'>Eliminar producto</button>
          </form>
          
      </main>
    </div>
  );
}