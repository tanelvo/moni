import React from 'react'
import Cards from './Cards'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Expenses() {
    const [isLoading, setIsLoading] = useState(true);
    const [Category, setCategories] = useState([]);
    const [Color, setColors] = useState([]);
    const[Id, setIds] = useState([]);
    const token = localStorage.getItem('token')
    const tokenDec = jwt(token)
    const owner = tokenDec.id;
    const Count = [];

    // Kasutaja kategooriate tõmbamine
    useEffect(() => {
        axios.get(`${SERVER_URL}/category/user/${owner}`)
            .then(response => {
                const catArray = [];
                const colArray = [];
                const idArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    const cat = response.data[i].title;
                    const col = response.data[i].color;
                    const id = response.data[i]._id;
                    if(response.data[i].ifIncome === 0){
                        catArray.push(cat);
                        colArray.push(col);
                        idArray.push(id);
                    }
                }  
                setCategories(catArray);
                setColors(colArray);
                setIds(idArray);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [owner])

    // Uue kategooria loomine
    const [formData, setFormData] = React.useState({
        title: "",
        color: ""
    })
    const handleChange = (e) => {
        const newFormData = { ...formData }
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault()
        axios.post(`${SERVER_URL}/category/create`, {
            title: formData.title,
            ifIncome: 0,
            owner: owner,
            color: formData.color
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        window.location.reload(false);
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    for(var i = 0; i < Category.length; i++){Count.push(i)}

    // Genereerib ükshaaval nupud
    let cardList =Count.map((i)=>{
        return (
                <Cards category={Category[i]} color={Color[i]} id={Id[i]} ifInc="0" border="#999" key={"key"+i} className="d-flex justify-content-between align-items-start"/>
        )
    })

    if (isLoading) {
        return (
        <div>
            <h2>Kulud:</h2>
            Loading..
        </div>)
    } else {
        return (
            <>
                <h2>Kulud:</h2>
                {cardList}
                {/* Nupuga peaks avama modali, kus saab andmebaasi uue kategooria päringu teha  */}
                <Button variant="dark" onClick={handleShow} style={{marginTop:"5px"}}>Lisa kategooria</Button>

                <Modal show={show} onHide={handleClose} centered className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Uus kategooria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Kategoria nimetus</Form.Label>
                        <Form.Control onChange={handleChange} value={formData.title} name="title" placeholder="Kategooria" type="input" className="text-center"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="exampleColorInput">Värv</Form.Label>
                        <Form.Control onChange={handleChange} name="color" style={{width:"100%"}}
                            type="color"
                        />
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
        );}      
    
}

export default Expenses