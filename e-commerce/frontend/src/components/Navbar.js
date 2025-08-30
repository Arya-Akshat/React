// frontend/src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const cartItemCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">MERN-Shop</Link>
      <div className="navbar-links">
        {auth.user ? (
          <>
            <span>Welcome, {auth.user.username}</span>
            {auth.user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <Link to="/cart">Cart ({cartItemCount})</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;