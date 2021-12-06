import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Modal, Form, Badge } from 'react-bootstrap'
import axios from 'axios'
import jwt from 'jwt-decode'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Cards(props) {
    const [isLoading, setIsLoading] = useState(true);
    const category = props.category;
    const color = props.color;
    const id = props.id;
    const ifInc = props.ifInc;
    const [amount, setAmount] = useState([]);
    const token = localStorage.getItem('token')
    const tokenDec = jwt(token)
    const owner = tokenDec.id;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(`${SERVER_URL}/transaction/${id}`)
            .then(response => {
                const amountArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    const amnt = response.data[i].amount;
                    amountArray.push(amnt);
                }
                setAmount(amountArray);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [id])
    const [formData, setFormData] = React.useState({
        title: "",
        amount: ""
    })
    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${SERVER_URL}/transaction/create`, {
            category: id,
            title: formData.title,
            amount: formData.amount,
            owner: owner,
            ifIncome: ifInc,
            creationDate: Date()
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const sum = amount.reduce((a, b) => a + b, 0);      // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    let Sum = Math.round((sum + Number.EPSILON) * 100) / 100; // Hoiab ära hiigel koma arve

    if (isLoading) {
        return (<div>Loading..</div>)
    } else {
        return(
            <>
            { /*  Nupp, mis näitab kategooriat ja kategooria summat  */}
            <div onClick={() => handleShow()} style={{marginTop:"5px"}}>
            <Button variant="dark" size="lg" style={{background:color, border:color, width:"100%"}}> { category }&nbsp;
                <Badge bg="dark" style={{textAlign: "right"}}>{Sum}</Badge>
            </Button>
            </div>
            { /* Modal, mis tekib nupu vajutusel */}
            <Modal show={show} onHide={handleClose} centered className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>{ category }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nimi</Form.Label>
                        <Form.Control onChange={handleChange} value={formData.title} name="title" placeholder="Kategooria" type="input" className="text-center"/>
                    </Form.Group>
                    <Form.Group className="mb-3" style={{ width: "10rem" }}>
                        <Form.Label>Summa</Form.Label>
                        <Form.Control onChange={handleChange} value={formData.amount} name="amount" type="number" placeholder="00,00€" className="text-center"/>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={handleClose}>
                        Salvesta
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="danger" onClick={handleClose}>
                        Sulge
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

export default Cards