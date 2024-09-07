import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, deleteUser } from '../../features/users/userSlice';
import { Container, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(state => state.users.userProfile);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate('/users'); // หลังจากลบแล้วให้กลับไปยังหน้ารายการผู้ใช้
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

  if (!userProfile) {
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
          <Card.Title>{userProfile.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {userProfile.email}
          </Card.Text>
          <Card.Text>
            <strong>Phone:</strong> {userProfile.phone}
          </Card.Text>
          <Card.Text>
            <strong>Website:</strong> <a href={`http://${userProfile.website}`} target="_blank" rel="noopener noreferrer">{userProfile.website}</a>
          </Card.Text>
          <Button variant="warning" as={Link} to={`/edit-user/${id}`} className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
