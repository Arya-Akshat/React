// frontend/src/pages/Cart.js
import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import api from '../services/api';
import './Cart.css';

const Cart = () => {
  const { cart, addToCart, decreaseQuantity } = useContext(CartContext);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const { data: order } = await api.post('/razorpay/create-order');

      if (!order) {
        alert('Payments are disabled currently.');
        return;
      }

      const options = {
        key: 'YOUR_KEY_ID', // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'MERN-Shop',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          const data = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await api.post('/razorpay/verify-payment', data);

          alert(result.data.status);
        },
        prefill: {
          name: 'Test User',
          email: 'test.user@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Test Address',
        },
        theme: {
          color: '#3399cc',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      if (error.response && (error.response.status === 500 || error.response.status === 400)) {
        alert('Payments are disabled currently.');
      } else {
        console.error("Checkout error:", error);
        alert("An error occurred during checkout.");
      }
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
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.productId._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item.productId._id, 1)}>+</button>
            </div>
            <p>Price: ₹{item.productId.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;