import React from 'react'
import Cards from './Cards'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'

function Expenses() {
    // Ajutised, et nuppe genereerida
    let items=[1,2,3];
    let Amount=["123","222","333"]
    let Category=["test","test2","test3"]
    let Color=["#929","#1fb","#0bf"]

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Genereerib ükshaaval nupud
    let cardList=items.map((i)=>{
        return <Cards amount={Amount[i-1]} category={Category[i-1]} color={Color[i-1]} border="#999"/>
      })
    return (
        <>
            {cardList}
            {/* Nupuga peaks avama modali, kus saab andmebaasi uue kategooria päringu teha  */}
            <Button variant="dark" onClick={handleShow} style={{marginTop:"5px"}}>Lisa kategooria</Button>

            <Modal show={show} onHide={handleClose} centered className="text-center">
            <Modal.Header closeButton>
                <Modal.Title>Uus kategooria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Kategoria nimetus</Form.Label>
                    <Form.Control type="input" placeholder="Tekst" className="text-center" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="exampleColorInput">Värv</Form.Label>
                    <Form.Control className="text-center" style={{width:"100%"}}
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#563d7c"
                        title="Choose your color"
                    />
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
    );
    
    
}

export default Expenses