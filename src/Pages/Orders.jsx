import React, { useState } from 'react';

const api7 = import.meta.env.VITE_API_7;
const api8 = import.meta.env.VITE_API_8;

export default function Orders() {
  const [idOrder, setIdOrder] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setError(null);
    try {
      const response = await fetch(`${api7}/${idOrder}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setOrder(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setOrder(null);
    }
  };

  const checkOrder = (id) => {
    fetch(`${api8}/${id}`, {
      method: "PUT"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setOrder(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const calcularTotalReserva = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => {
      return total + (item.quantityReserved * item.product.priceProduct);
    }, 0);
  };

  return (
    <>
      <div>Orders</div>

      <div>
        <input
          type="text"
          placeholder='Ingrese el ID de la orden'
          value={idOrder}
          onChange={(e) => setIdOrder(e.target.value)}
        />
        <button onClick={fetchOrders}>
          Consultar Orden
        </button>
      </div>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>Error al consultar la orden: {error}</p>
        </div>
      )}

      {order && (
        <div>
            <h2>Reserva #{order.idReserved}</h2>
            <p>Estado: {order.activeReserved ? 'Por entregar' : 'Entregado'}</p>
            <p>Codigo: {order.codeReserved}</p>
            <p>Cliente: {order.userEntity.nameUser}</p>

            <hr />
            <h3>Detalle del Producto:</h3>
            <p><strong>Producto:</strong> {order.product.productName}</p>
            <p><strong>Cantidad:</strong> {order.quantityReserved}</p>
            <p><strong>Precio Unitario:</strong> ${order.product.priceProduct}</p>
            <p><strong>Total:</strong> ${order.quantityReserved * order.product.priceProduct}</p>
            <hr />
            <div>
              <button onClick={() => checkOrder(order.idReserved)}>
                Orden Entregada
              </button>
            </div>
        </div>
      )}
    </>
  );
}