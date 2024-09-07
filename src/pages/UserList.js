import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/userSlice';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Alert, Spinner, Button } from 'react-bootstrap';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const status = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
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
      <h1 className="text-center mb-4">All Users</h1>

      {/* ปุ่มเพิ่มผู้ใช้ใหม่ */}
      <div className="text-center mb-4">
        <Button as={Link} to="/create-user" variant="success" className="shadow-sm">
          Add New User
        </Button>
      </div>

      <Row className="justify-content-center">
        <Col md={8}>
          <ListGroup className="shadow-sm border rounded">
            {users.map(user => (
              <ListGroup.Item 
                key={user.id} 
                className="d-flex justify-content-between align-items-center p-3 border-bottom"
                style={{ backgroundColor: '#f8f9fa' }} // สีพื้นหลังอ่อน ๆ
              >
                <div>
                  <Link to={`/users/${user.id}`} className="text-decoration-none text-dark fs-5">
                    {user.name}
                  </Link>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
