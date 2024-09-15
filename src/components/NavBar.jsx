import React from 'react';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Sherif Hamad</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Home Server" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/plex">Plex</NavDropdown.Item>
                            <NavDropdown.Item href="/calibre">Calibre</NavDropdown.Item>
                            <NavDropdown.Item href="/calibre-web">Calibre Web</NavDropdown.Item>
                            <NavDropdown.Item href="/portainer">Portainer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex ms-auto">
                        <input
                            type="text"
                            placeholder="Search my Website ..."
                            className="form-control rounded animated-input"
                            id="inputSearch"
                        />
                        <button type="button" className="btn btn-primary rounded animated-button ms-2">Search</button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;


<nav className="nav-bar">
    <a href="/plex">Plex</a>
    <a href="/calibre">Calibre</a>
    <a href="/calibre-web">Calibre Web</a>
    <a href="/portainer">Portainer</a>
</nav>