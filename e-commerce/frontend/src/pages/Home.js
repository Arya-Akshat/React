// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get('/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <div className="hero-section">
        <h1>Welcome to MERN-Shop</h1>
        <p>Your one-stop shop for everything you need</p>
        <button>Shop Now</button>
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <div className="all-products">
        <h2>All Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;