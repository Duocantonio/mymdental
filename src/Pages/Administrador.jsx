import { useParams } from 'react-router-dom';
import Dashboard from '../Components/DashboardProductos';

import "../Styles/Categoria.css"

// Componente para la página de administración de productos

export default function Administrador() {

  const { nameDepartment } = useParams();

    const urlBack = "http://localhost:8080/MyMDentalCommerce/products/adminProducts";



  return (
    <>
      <Dashboard urlBack={urlBack} />
    </>
  );
}