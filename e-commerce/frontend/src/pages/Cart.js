// frontend/src/pages/Cart.js
import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';
import './Cart.css';

// Make sure to add your publishable key.
const stripePromise = loadStripe('your_stripe_publishable_key_pk_...');

const Cart = () => {
  const { cart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
        const stripe = await stripePromise;
        const { data: session } = await api.post('/checkout/create-session');
        
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error("Checkout error:", error);
        alert("An error occurred during checkout.");
    }
  };

  if (!cart || cart.items.length === 0) {
    return <h2>Your cart is empty</h2>;
  }
  
  const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {cart.items.map(item => (
        <div key={item.productId._id} className="cart-item">
          <img src={item.productId.imageUrl} alt={item.productId.name}/>
          <div>
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.productId.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;