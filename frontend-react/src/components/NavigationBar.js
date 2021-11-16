import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function NavigationBar() {
    return (
        <>
            <Navbar bg="dark" expand="lg" className="navbar" sticky="top">
                <Navbar.Brand ><Link to="/" id="navbar-logo">moni</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Link id="navbar-link-el" to="/">Home</Link>    {/* AJUTINE! Praegu ainult selleks, et lihtsam navigeerida */}
                    <Link id="navbar-link-el" to="/login">Login</Link> {/* AJUTINE! Praegu ainult selleks, et lihtsam navigeerida */}
                    <Link id="navbar-link-el" to="/register">Register</Link> {/* AJUTINE! Praegu ainult selleks, et lihtsam navigeerida */}
                    {/* Pärast tuleb siia ainult kogu summa nagu disainis välja toodud */}
                </Nav>
                <NavDropdown title="Username" id="basic-nav-dropdown" className="navbar-username-el">
                    <NavDropdown.Item>Seaded</NavDropdown.Item>
                    <NavDropdown.Item>Logi välja</NavDropdown.Item>
                </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
export default NavigationBar;