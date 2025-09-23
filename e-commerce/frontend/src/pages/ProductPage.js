// frontend/src/pages/ProductPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // Assuming you have an api service setup
import CartContext from '../context/CartContext';
import '../ProductPage.css'; // We'll create this CSS file

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Note: We need a backend route for GET /products/:id
        // For now, let's fetch all and find the one.
        const { data } = await api.get('/products');
        const foundProduct = data.find(p => p._id === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
      </div>
      <div className="product-details-container">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product._id, 1)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;

