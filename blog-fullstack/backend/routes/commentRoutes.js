
// backend/routes/commentRoutes.js
const express = require('express');
// This allows us to access the `:id` param from the parent router (`/posts/:id`)
const router = express.Router({ mergeParams: true });
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// POST a new comment on a specific post
router.post('/:id/comments', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      text: req.body.text,
      author: req.body.author,
      post: post._id
    });

    const newComment = await comment.save();
    
    // Add the comment's ID to the post's comments array
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
