// frontend/src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from './AuthContext';
import { toast } from 'react-toastify';

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
      toast.success('Item added to cart successfully!');
    } catch (error) {
      console.error("Failed to add to cart", error);
      toast.error('Failed to add item to cart.');
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const { data } = await api.put(`/cart/decrease/${productId}`);
      setCart(data);
      toast.success('Item quantity updated successfully!');
    } catch (error) {
      console.error("Failed to decrease quantity", error);
      toast.error('Failed to update item quantity.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;