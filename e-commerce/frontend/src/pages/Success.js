import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default Success;