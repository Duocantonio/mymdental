import React from 'react'
import "../Styles/Productos.css";
import { useProductsState } from '../hooks/UseProducts';

export default function Productos({ isFiltered = false, filter = "" }) {
  const { productsState, pagesState } = useProductsState(1, isFiltered, filter);
  const { products, loading, error, errorBody, searchProductsByPage } = productsState
  const { maxPages, currentPage, loadingPages, errorPages, errorBodyPages, getDatesByProductsPage } = pagesState


  if (loading || loadingPages) {
    return (
      <>
        <h1>Cargando productos y recursos</h1>
        <p>Por favor espere...</p>
      </>
    )
  }

  if (error) {
    const status = errorBody?.code ?? "Desconocido"
    const message =
      errorBody?.message ??
      (typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody))

    return (
      <>
        <h1>Ocurrió un error, por favor inténtalo de nuevo</h1>
        <p>code: {errorBody?.code ?? "Unknown"}</p>
        <p>message: {errorBody?.message ?? "Unknown"}</p>
        <button onClick={() => searchProductsByPage(1)}>Volver a cargar productos</button>
      </>
    )
  }

  if (errorPages){
    return(
      <>
      <h1>Error con los indices de páginas</h1>
      <p>code: {errorBodyPages?.code ?? "Unknown"}</p>
      <p>message: {errorBodyPages?.message ?? "Unknown"}</p>
      </>
    );
  }

  let pagesButtons = []
  for (let i = 1; i <= maxPages; i++){
    pagesButtons.push(i)
  }

  return (
    <>
      <h1>Catálogo de productos</h1>
      {products.map((p) => (
        <div key={p.id ?? p.productName}>
          <h2>{p.productName}</h2>
          <p>{p.priceProduct}</p>
          <p>{p.nameDepartment}</p>
        </div>
      ))}

      <div className='container'>
        <div className='row'>
          {pagesButtons.map((indexButton) => {
            if (indexButton === currentPage){
              return(
                <button className='col-1 align-center text-center' disabled>{indexButton}</button>
              );
            }else{
              return(
                <button className='col-1 align-center text-center'
                onClick={() => searchProductsByPage(indexButton)}
                >{indexButton}</button>
              );
            }
          })}
        </div>

      </div>

    </>

  )
}
