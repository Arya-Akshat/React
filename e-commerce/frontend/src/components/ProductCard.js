// frontend/src/components/ProductCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/share/2753.jpg" }} />
        <h3>{product.name}</h3>
      </Link>
      <p>₹{product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;