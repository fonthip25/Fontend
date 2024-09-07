import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../features/categories/categorySlice';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" />
        <span className="ms-3">Loading...</span>
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Categories</h1>

      {/* ปุ่มสำหรับสร้างหมวดหมู่ใหม่ */}
      <div className="text-center mb-4">
        <Link to="/create-category" className="btn btn-success btn-sm">
          Create New Category
        </Link>
      </div>

      <Row className="justify-content-center">
        <Col md={6}>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                className="d-flex justify-content-between align-items-center mb-2 p-2 rounded shadow-sm bg-light"
              >
                <div>
                  <Link to={`/categories/${category.id}`} className="text-decoration-none text-dark fs-6">
                    {category.name}
                  </Link>
                </div>
                <div>
                  {/* ปุ่มแก้ไขหมวดหมู่ */}
                  <Button variant="warning" as={Link} to={`/edit-category/${category.id}`} size="sm" className="me-2">
                    Edit
                  </Button>
                  {/* ปุ่มลบหมวดหมู่ */}
                  <Button variant="danger" as={Link} to={`/delete-category/${category.id}`} size="sm">
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryList;
