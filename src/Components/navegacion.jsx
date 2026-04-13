import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Styles/navegacion.css';
import logoImagen from '../assets/Imagenes/Logomym.png';



export default function Navegacion() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/MyMDentalCommerce/departments/getDepartments')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error("Error cargando categorías:", error));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top shadow-sm"> 
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
  <img 
    src={logoImagen}  
    alt="M&M Dental" 
    
  />
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            


            <li className="nav-item">
              <Link className="nav-link" to="/administrador">
                Registro Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Nosotros">
                Nosotros
              </Link>
            </li>

           <li
              className="nav-item position-static" 
              onMouseEnter={() => setMostrarMenu(true)}
              onMouseLeave={() => setMostrarMenu(false)}
            >
              <span className="nav-link" style={{ cursor: 'pointer' }}>
                Categorías ▼
              </span>
              {mostrarMenu && (
                  <div className="mega-menu-content">
                    {categorias.map(categoria => (
                      <div className="columna-categoria" key={categoria.nameDepartment}>
                        <Link to={`/categoria/${encodeURIComponent(categoria.nameDepartment)}`}>
                          {categoria.nameDepartment}
                        </Link>
                      </div>
                    ))}
                  </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}