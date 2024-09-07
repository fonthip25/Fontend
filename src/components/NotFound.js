import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '80vh' }}>
      <h1 className="display-4 text-danger">404 - Page Not Found</h1>
      <p className="lead">The page you are looking for doesn't exist.</p>
      <Button as={Link} to="/" variant="primary" className="mt-3">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
