import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Payment Canceled</h2>
      <p>Your order was not processed. You can continue shopping or try again.</p>
      <Link to="/cart">Return to Cart</Link>
    </div>
  );
};

export default Cancel;