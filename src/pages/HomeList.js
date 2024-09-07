import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container className="text-center">
        <Row>
          <Col>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#343a40' }}>Welcome to My Blog</h1>
            <p className="lead" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
              Discover the latest posts and updates from our authors. Stay tuned for more amazing content!
            </p>
            <Button variant="primary" size="lg" as={Link} to="/posts" className="shadow-sm mt-3">
              View Latest Posts
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
