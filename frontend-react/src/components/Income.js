import React from 'react'
import Cards from './Cards'
import { Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Income() {
    const [isLoading, setIsLoading] = useState(true);
    const [Category, setCategories] = useState([]);
    const [Color, setColors] = useState([]);
    const Count = [];
    let Amount=["123","222","333","100","100","100"]

    // Kasutaja kategooriate tõmbamine
    useEffect(() => {
        const user = "12321";
        axios.get(`${SERVER_URL}/category/user/${user}`)
            .then(response => {
                const catArray = [];
                const colArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    const cat = response.data[i].title;
                    const col = response.data[i].color;
                    if(response.data[i].ifIncome === 1){
                        catArray.push(cat);
                        colArray.push(col);
                    }
                }  
                setCategories(catArray);
                setColors(colArray);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [])
    
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
        e.preventDefault()
        const Owner = "12321"
        axios.post(`${SERVER_URL}/category/create`, {
            title: formData.title,
            ifIncome: 1,    
            owner: Owner,
            color: formData.color
        })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    for(var i = 0; i < Category.length; i++){Count.push(i)}

    // Genereerib ükshaaval nupud
    let cardList =Count.map((i)=>{ console.log(i)
        return (
                <Cards amount={Amount[i]} category={Category[i]} color={Color[i]} border="#999" key={"key"+i}/>
        )
    })

    if (isLoading) {
        return (<div>Loading..</div>)
    } else {
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
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Kategoria nimetus</Form.Label>
                        <Form.Control onChange={handleChange} value={formData.title} name="title" type="input" className="text-center"/>
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

export default Income