// frontend/src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  // Create a short preview of the content
  const preview = post.content.substring(0, 150) + '...';

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p className="post-author">by {post.author}</p>
      <p>{preview}</p>
      <Link to={`/posts/${post._id}`} className="read-more-link">Read More</Link>
    </div>
  );
}

export default PostCard;

// ---