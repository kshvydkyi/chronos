// import { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
import logo from '../../assets/images/icon.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container >
            <img src={logo} height={40} alt='logo'/>
          <Navbar.Brand href="/">Anonymous Chronos</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/calendar">Календар</Nav.Link>
              <Nav.Link href="#pricing">Пріколи</Nav.Link>
              <NavDropdown title="Дії" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Дія 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Дія 2
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Дія 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Тут пріколи
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/login">Вхід</Nav.Link>
              <Nav.Link eventKey={2} href="/registration">
               Реєстрація
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    )
}
export default Header;