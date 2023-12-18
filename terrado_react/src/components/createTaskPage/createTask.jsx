// src/components/CreateTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
const CreateTask = ({ history }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()
  const handleCreateTask = () => {
    const newTask = { title, description };
    const token = sessionStorage.getItem('token');
  
    axios.post('http://localhost:5000/usertask', newTask, {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then(response => {
        dispatch(addTask(response.data));
        navigate('/home');
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          console.error('Unauthorized - Insufficient Permissions');
        } else {
          console.error('Error creating task:', error);
        }
      });
  };
  
  function handleBackBtn(){
        navigate('/home')
  }
  function handleLogout() {
      sessionStorage.removeItem("token");
      navigate("/");
    }

  return (
    <div>
        <div>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Terra.do</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Logout" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={handleLogout}>
               Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
            <Button variant="outline-success" onClick={handleBackBtn}>Back</Button>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </div>

       <Form style={{width:'50%',marginLeft:'25%'}}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Task</Form.Label>
        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Button variant="primary" onClick={handleCreateTask} style={{width:'25%',marginLeft:'34%'}}>
        Create
      </Button>
    </Form>
    </div>
  );
};

export default CreateTask;
