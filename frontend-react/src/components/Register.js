import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {
    return (
        <div className="register-form">
            <Form>
                <Form.Control type="text" placeholder="Eesnimi" />
                <Form.Control type="text" placeholder="Perekonnanimi" />
                <Form.Control type="email" placeholder="E-post" />
                <Form.Control type="password" placeholder="Salasõna" />
                <Button variant="primary" type="submit" id="register-submit-btn">Registreeru!</Button>
            </Form>
        </div>
    )
}
export default Register;