import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Link } from 'react-router-dom'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL


function Register() {

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        initBalance: ""
    })

    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${SERVER_URL}/register`, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            initBalance: parseInt(formData.initBalance) 
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
    
    return (
        <div className="register-form">
            <Form onSubmit={handleSubmit}>
                <h1 id="form-headers">Registreeru!</h1>
                <Form.Control onChange={handleChange} value={formData.firstName} name="firstName" type="text" placeholder="Eesnimi" />
                <Form.Control onChange={handleChange} value={formData.lastName} name="lastName" type="text" placeholder="Perekonnanimi" />
                <Form.Control onChange={handleChange} value={formData.email} name="email" type="email" placeholder="E-post" />
                <Form.Control onChange={handleChange} value={formData.password} name="password" type="password" placeholder="Salasõna" />
                <Form.Control onChange={handleChange} value={formData.initBalance} name="initBalance" type="number" placeholder="Konto summa" />
                <Button variant="primary" type="submit" id="register-submit-btn">Registreeru!</Button>
                <p id="register-login-link"><Link to="/login">Kasutaja olemas? Logi sisse</Link></p>
            </Form>
        </div>
    )
}
export default Register;