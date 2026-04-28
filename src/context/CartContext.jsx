import React, { Children, createContext } from 'react'
import { useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.idProduct === product.idProduct);
        if (existingProduct) {
            setCart(cart.map((item) => 
                item.idProduct === product.idProduct 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    }

    const reduceQuantityFromCart = (product) => {
        const existingProduct = cart.find((item) => item.idProduct === product.idProduct);
        if (existingProduct && existingProduct.quantity > 1){
            setCart(cart.map((item) => {
                if (item.idProduct === product.idProduct){
                    return {...item, quantity: item.quantity - 1}
                }else{
                    return item;
                }
                
            }))
        }
    }

    const deleteFromCart = (product) => {
        setCart(cart.filter((item) => item.idProduct !== product.idProduct));
    }

    const deleteCart = () => {
        setCart([]);
    }

    const getAllQuantityFromCart = () => {
        return cart.reduce((accumulator, product) => {
            accumulator += product.quantity
            return accumulator
        }, 0)
    }

    const getTotalPriceFromCart = () => {
        return cart.reduce((totalPrice, product) => {
            totalPrice += product.priceProduct * product.quantity
            return totalPrice
        }, 0)
    }

    const getTotalPriceFromProduct = (product) => {
        return product.priceProduct * product.quantity
    }

    const saveCartInLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const getCartFromLocalStorage = () => {
        const cartFromStorage = localStorage.getItem('cart');
        console.log("Cart from localStorage:", cartFromStorage);
        if (cartFromStorage){
            setCart(JSON.parse(cartFromStorage));
        }
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, 
        reduceQuantityFromCart, 
        deleteFromCart, 
        deleteCart, 
        getAllQuantityFromCart, 
        getTotalPriceFromCart, 
        getTotalPriceFromProduct,
        saveCartInLocalStorage,
        getCartFromLocalStorage}}>
            {children}
        </CartContext.Provider>
   
  )
}
export const useCarrito = () => useContext(CartContext);