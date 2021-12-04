import React from 'react'
import { useState } from 'react'
import { Button, Modal, Form, Badge } from 'react-bootstrap'
function Cards(props) {
    const amount = props.amount;
    const category = props.category;
    const color = props.color;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
        <>
        { /*  Nupp, mis näitab kategooriat ja kategooria summat  */}
        <div onClick={() => handleShow()} style={{marginTop:"5px"}}>
        <Button variant="dark" size="lg" style={{background:color, border:color, width:"100%"}}> { category }
            <Badge bg="dark" style={{textAlign: "right"}}>{amount}</Badge>
            <span className="visually-hidden">unread messages</span>
        </Button>
        </div>
        { /* Modal, mis tekib nupu vajutusel */}
        <Modal show={show} onHide={handleClose} centered className="text-center">
            <Modal.Header closeButton>
                <Modal.Title>{ category }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Nimi</Form.Label>
                    <Form.Control type="input" placeholder="Kulutus" className="text-center" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Kirjeldus</Form.Label>
                    <Form.Control type="input" placeholder="Kulutuse kirjeldus" className="text-center" />
                </Form.Group>
                <Form.Group className="mb-3" style={{ width: "10rem" }}>
                    <Form.Label>Summa</Form.Label>
                    <Form.Control type="number" placeholder="00,00€" className="text-center"/>
                </Form.Group>
                
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Sulge
                </Button>
                <Button variant="dark" onClick={handleClose}>
                    Salvesta
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default Cards