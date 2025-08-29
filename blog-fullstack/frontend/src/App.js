
// frontend/src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="main-nav">
        <Link to="/"><h1>My Blog</h1></Link>
        <Link to="/create" className="create-post-link">Create New Post</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

// ---