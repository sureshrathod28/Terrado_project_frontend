import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
function NavScrollExample() {
    const navigate=useNavigate()
    function handleBtn(){
          navigate('/create-task')
    }
    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
      }
  return (
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
            <Button variant="outline-success" onClick={handleBtn}>Create Task</Button>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;