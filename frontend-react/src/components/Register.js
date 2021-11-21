import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Register() {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("work")
    }

    return (
        <div className="register-form">
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="Eesnimi" />
                <Form.Control type="text" placeholder="Perekonnanimi" />
                <Form.Control type="email" placeholder="E-post" />
                <Form.Control type="password" placeholder="Salasõna" />
                <Form.Control type="number" placeholder="Konto summa" />
                <Button variant="primary" type="submit" id="register-submit-btn">Registreeru!</Button>
            </Form>
        </div>
    )
}
export default Register;