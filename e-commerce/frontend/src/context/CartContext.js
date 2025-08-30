// frontend/src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (auth.token) {
        try {
          const { data } = await api.get('/cart');
          setCart(data);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      } else {
        setCart(null); // Clear cart on logout
      }
    };
    fetchCart();
  }, [auth.token]);

  const addToCart = async (productId, quantity) => {
    try {
      const { data } = await api.post('/cart/add', { productId, quantity });
      setCart(data);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;