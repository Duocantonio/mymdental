import React from 'react'
import { useCarrito } from '../context/CartContext';
import { useEffect } from 'react';
import '../Styles/Carrito.css'
import Marca1 from "../assets/Imagenes/marca1.png"

export const Carrito = () => {
    const { cart,
         addToCart,
          reduceQuantityFromCart,
           deleteFromCart,
            deleteCart,
             getAllQuantityFromCart,
              getTotalPriceFromCart,
               getTotalPriceFromProduct,
                saveCartInLocalStorage,
                 getCartFromLocalStorage} = useCarrito();


     return (
        <>
        <button onClick={()=> console.log(cart)}>print cart</button>
        <button onClick={() => getCartFromLocalStorage()}>get resources</button>
        <div className="cart-container">
            <h2>Carrito de Compras</h2>

            {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="cart-header">
                        <p>Producto</p>
                        <p>Precio</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                        <p>Acción</p>
                    </div>

                    <ul className="cart-items">
                        {cart.map((producto) => {
                            console.log("Producto en carrito:", producto);


                            return (
                                <li className="cart-item" key={producto.idProduct}>
                                    <div className="product-info">
                                        <img 
                                            src={Marca1} 
                                            className="product-image" 
                                            alt="Product image"
                                        />
                                        {console.log(producto)}
                                        <span>{producto.productName}</span>
                                    </div>

                                    <p>${producto.priceProduct}</p>

                                    <div className="quantity-controls">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => reduceQuantityFromCart(producto)}
                                        >
                                            -
                                        </button>

                                        <span>{producto.cantidad}</span>

                                        <button 
                                            className="quantity-btn"
                                            onClick={() => addToCart(producto)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p>${getTotalPriceFromProduct(producto)}</p>

                                    <button 
                                        className='remove-btn'
                                        onClick={() => deleteFromCart(producto)}
                                    >
                                        🗑️
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            
            <div className="cart-summary">
                <h3>Resumen Pedido: {getAllQuantityFromCart()}</h3>
                <p className='total'>
                    Total del carrito: <strong>${getTotalPriceFromCart()}</strong>
                </p>
            </div>
        </div>

        <div>
            <button onClick={deleteCart}>Borrar carrito</button>
            <button onClick={() => saveCartInLocalStorage()}>Guardar carrito</button>
            <button>Agendar carrito</button>
        </div>
        </>
    )
}