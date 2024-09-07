import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#292929' }} className="py-3 mt-auto">
      <Container>
      <p className="text-center mb-0" style={{ color: '#FFD700' }}>&copy; 2024 My Blog. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
