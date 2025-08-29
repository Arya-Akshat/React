import React, { useState } from 'react';
import axios from 'axios';

function CommentList({ postId, comments, onCommentAdded }) {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await axios.post(`/posts/${postId}/comments`, { text, author });
      setText('');
      setAuthor('');
      onCommentAdded(); // Callback to refetch the post data
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Your Name" required />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Add a comment..." required />
        <button type="submit">Post Comment</button>
      </form>
      <ul className="comment-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <li key={comment._id}>
              <strong>{comment.author}:</strong> {comment.text}
            </li>
          ))
        ) : (
          <p>No comments yet. Be the first!</p>
        )}
      </ul>
    </div>
  );
}

export default CommentList;
