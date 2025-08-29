// frontend/src/pages/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../components/CommentList';

function PostDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the post ID from the URL

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="post-detail">
      <article>
        <h2>{post.title}</h2>
        <p className="post-author">by {post.author}</p>
        <div className="post-content">{post.content}</div>
      </article>
      <CommentList postId={post._id} comments={post.comments} onCommentAdded={fetchPost} />
    </div>
  );
}

export default PostDetail;

// ---