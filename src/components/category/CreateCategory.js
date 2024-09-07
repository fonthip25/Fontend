import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../features/categories/categorySlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name })).then(() => {
      navigate('/categories');
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Create New Category</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryName" className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit">
                Create Category
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCategory;
