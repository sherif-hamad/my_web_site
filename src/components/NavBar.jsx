import React from 'react';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

const NavBar = ({ currentPage, onNavigate }) => {
    const go = (page) => (e) => {
        e.preventDefault();
        if (onNavigate) onNavigate(page);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home" onClick={go('home')}>Sherif Hamad</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={currentPage}>
                        <Nav.Link href="#home" eventKey="home" onClick={go('home')}>Home</Nav.Link>
                        <Nav.Link href="#music" eventKey="music" onClick={go('music')}>Music</Nav.Link>
                        <Nav.Link href="/audio-tools/">Audio Tools</Nav.Link>
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
