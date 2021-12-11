import { useState, useEffect} from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function HistoryTab (props) {
    const amount = props.amount;
    const category = props.category;
    const title = props.title;
    const date = props.date;
    const id = props.id;
    const [Category, setCategory] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(`${SERVER_URL}/category/${category}`)
            .then(response => {
                setCategory(response.data[0].title)
            })
            .catch(error => console.error(error));
    }, [category])

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${SERVER_URL}/transaction/delete/${id}`)
        handleClose()
        window.location.reload(false)
    }

    return(
        <div>
            <Card className="mt-5" style={{  textAlign: 'center', width: '30rem' }}>
                <Card.Body >
                    <Card.Subtitle >{Category}</Card.Subtitle>
                    <Card.Title style={{ fontSize: 30 }}>Summa: {amount}</Card.Title>
                    <Card.Title >Kirjeldus:</Card.Title>
                    <Card.Subtitle >{title}</Card.Subtitle><br/>
                    <Card.Subtitle style={{color: '#aaa'}}>{date}</Card.Subtitle>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={handleShow} variant="danger">Delete</Button>
                </Card.Footer>
            </Card>
            <Modal show={show} onHide={handleClose} centered className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Kustuta kindlalt?</Modal.Title>
                </Modal.Header>
                <Modal.Body className=" d-flex justify-content-between align-items-start">
                <Button variant="dark" onClick={handleClose}>Sulge</Button>
                <Button variant="danger" onClick={handleDelete}>Kustuta</Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default HistoryTab