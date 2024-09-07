import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../features/posts/postSlice';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      navigate('/posts');
    } catch (err) {
      setError('Error deleting post');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          
          {/* แสดง category ของโพสต์ ถ้ามี */}
          {post.category ? (
            <Alert variant="info">
              <strong>Category: </strong> {post.category.name}
            </Alert>
          ) : (
            <Alert variant="warning">
              ไม่มีหัวข้อ
            </Alert>
          )}

          <Card.Text>{post.content}</Card.Text>
          <Link to="/posts" className="btn btn-secondary me-2">Back to Posts</Link>
          <Link to={`/edit-post/${id}`} className="btn btn-primary me-2">Edit Post</Link>
          <Button variant="danger" onClick={handleDelete}>Delete Post</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetail;
