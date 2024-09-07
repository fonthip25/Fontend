import React, { useState } from 'react';
import axios from 'axios';

const AddComment = ({ postId, onAddComment }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        content,
        postId: parseInt(postId),
        author,
      };

      const response = await axios.post('http://localhost:5000/comments', newComment);
      onAddComment(response.data);

      setContent('');
      setAuthor('');
      setError(null);
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Comment</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;
