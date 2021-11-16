import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {
    return (
        <div className="login-form">
            <Form>
                <Form.Control type="email" placeholder="E-post" />
                <Form.Control type="password" placeholder="Salasõna" />
                <Button variant="primary" type="submit">Logi sisse</Button>
            </Form>
        </div>
    )
}
export default Login;