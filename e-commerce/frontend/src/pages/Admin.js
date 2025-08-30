// frontend/src/pages/Admin.js
import React, { useState } from 'react';
import api from '../services/api';

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = { name, description, price: Number(price), imageUrl };
      await api.post('/products', newProduct);
      alert('Product added successfully!');
      // Clear form
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to add product', error);
      alert('Failed to add product. Please check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Add New Product</h2>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Product Description" required style={{width: '100%', minHeight: '100px', boxSizing: 'border-box', marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px'}}/>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default Admin;