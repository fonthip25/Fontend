import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../features/users/userSlice';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.userProfile);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserById(id));
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
    }
  }, [dispatch, id, status, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, name, email, phone, website })).then(() => {
      navigate(`/users/${id}`);
    });
  };

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
      <h1>Edit User</h1>
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
        <Button type="submit" className="mt-3">Save Changes</Button>
      </Form>
    </Container>
  );
};

export default EditUser;


