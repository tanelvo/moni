import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginError, setLoginError] = React.useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        axios.post(`${SERVER_URL}/login`, {
            email: email,
            password: password
        })
        .then((res) => {
            //console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setLoginError(false)
            navigate('/')
        })
        .catch((err) => {
            console.log(err)
            setLoginError(true)
        })

    }



    return (
        <div className="login-form">
            <Form onSubmit={handleLogin}>
                <h1 id="form-headers">Logi sisse!</h1>
                { loginError && (<div id="login-error-message">Sisselogimine ebaõnnestus!</div>) }
                <Form.Control onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="E-post" />
                <Form.Control onChange={e => setPassword(e.target.value)} name="password" type="password" placeholder="Salasõna" />
                <Button variant="primary" type="submit" id="login-button">Logi sisse</Button>
                <p id="login-register-link"><Link to="/register">Registreeru kasutajaks</Link></p>
            </Form>
        </div>
    )
}
export default Login;