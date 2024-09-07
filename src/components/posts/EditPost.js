import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../features/posts/postSlice';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';

const EditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // เก็บข้อมูลหมวดหมู่ทั้งหมด
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ดึงข้อมูลโพสต์และหมวดหมู่
  useEffect(() => {
    const fetchPostAndCategories = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:5000/posts/${id}`);
        setTitle(postResponse.data.title);
        setContent(postResponse.data.content);
        setSelectedCategory(postResponse.data.categoryId); // เซ็ตหมวดหมู่ที่เลือกไว้
        setLoading(false);

        const categoryResponse = await axios.get('http://localhost:5000/categories');
        setCategories(categoryResponse.data); // เก็บหมวดหมู่ทั้งหมด
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPostAndCategories();
  }, [id]);

  // เมื่อบันทึกโพสต์ที่แก้ไข
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id, title, content, categoryId: selectedCategory })).then(() => {
      navigate(`/posts/${id}`);
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
        <span className="ms-3">Loading...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Edit Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditPost;
