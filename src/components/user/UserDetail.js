import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../features/users/userSlice';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userProfile);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

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

  if (!user) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">User not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}
          </Card.Text>
          <Card.Text>
            <strong>Phone:</strong> {user.phone}
          </Card.Text>
          <Card.Text>
            <strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetail;
