import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ name, email, phone, website })).then(() => {
      navigate('/users');
    });
  };

  return (
    <Container className="mt-4">
      <h1>Create New User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-3">Create User</Button>
      </Form>
    </Container>
  );
};

export default CreateUser;
