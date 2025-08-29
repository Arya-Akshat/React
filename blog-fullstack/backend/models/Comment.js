
// backend/models/Comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  post: { type: Schema.Types.ObjectId, ref: 'Post' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);

// ---