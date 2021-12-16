import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import jwt from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'

function NavigationBar() {

    const navigate = useNavigate()

    const [getName, setGetName] = React.useState(true)
    const [userFirstName, setUserFirstName] = React.useState("")
    const token = localStorage.getItem('token')

    if(typeof token !== 'undefined' && token !== null && getName === true) {
        //console.log('test')
        const tokenDec = jwt(token)
        setUserFirstName(tokenDec.firstName)
        setGetName(false)
    }

    const userLogOut = () => {
        localStorage.clear()
        navigate('/login')
        window.location.reload()
    }


    return (
        <>
            <Navbar bg="dark" expand="lg" className="navbar" sticky="top">
                <Navbar.Brand ><Link to="/" id="navbar-logo">moni</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Link id="navbar-link-el" to="/">Home</Link>
                    <Link id="navbar-link-el" to="/history">Ajalugu</Link>    {/* AJUTINE! Praegu ainult selleks, et lihtsam navigeerida */}
                    {/* <Link id="navbar-link-el" to="/login">Login</Link> AJUTINE! Praegu ainult selleks, et lihtsam navigeerida
                    <Link id="navbar-link-el" to="/register">Register</Link> AJUTINE! Praegu ainult selleks, et lihtsam navigeerida */}
                    {/* Pärast tuleb siia ainult kogu summa nagu disainis välja toodud */}
                </Nav>
                <NavDropdown title={userFirstName} id="basic-nav-dropdown" className="navbar-username-el">
                    <NavDropdown.Item as="li" >
                        <Link id="navbar-link-el2" to="/settings">Seaded</Link>  
                    </NavDropdown.Item>
                    <NavDropdown.Item><button onClick={userLogOut} id="logout-button">Logi välja</button></NavDropdown.Item>
                </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
export default NavigationBar;