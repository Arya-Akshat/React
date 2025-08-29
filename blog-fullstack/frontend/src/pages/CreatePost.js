// frontend/src/pages/CreatePost.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/posts', { title, content, author });
      navigate('/'); // Redirect to home page on success
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post-page">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your Name" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post here..." required />
        <button type="submit">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
