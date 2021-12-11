import React, { useState, useEffect } from 'react'
import { ListGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import jwt from 'jwt-decode'
import axios from 'axios'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Settings() {
    //const [isLoading, setIsLoading] = useState(true);
    const [incCategory, setIncCategories] = useState([]);
    //const [incColor, setIncColors] = useState([]);
    const [incId, setIncIds] = useState([]);
    const [expCategory, setExpCategories] = useState([]);
    const [expId, setExpIds] = useState([]);
    const [show, setShow] = useState(false);
    let [id, setId] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const token = localStorage.getItem('token')
    const tokenDec = jwt(token)
    const owner = tokenDec.id;
    const incCount = [];
    const expCount = [];

    useEffect(() => {
        axios.get(`${SERVER_URL}/category/user/${owner}`)
            .then(response => {
                const incCatArray = [];
                //const incColArray = [];
                const incIdArray = [];
                const expCatArray = [];
                //const expColArray = [];
                const expIdArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    const cat = response.data[i].title;
                    //const col = response.data[i].color;
                    const id = response.data[i]._id;
                    if(response.data[i].ifIncome === 0){
                        expCatArray.push(cat);
                        //expColArray.push(col);
                        expIdArray.push(id);
                    } else {
                        incCatArray.push(cat);
                        //incColArray.push(col);
                        incIdArray.push(id);
                    }}
                setExpCategories(expCatArray);
                setExpIds(expCatArray);
                setIncCategories(incCatArray);
                setIncIds(incIdArray);
                //setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [owner])

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${SERVER_URL}/transaction/deletecat/${id}`)
        axios.delete(`${SERVER_URL}/category/delete/${id}`)
        handleClose()
        window.location.reload(false)
    }

    for(var i = 0; i < incCategory.length; i++){incCount.push(i)}
    for(var j = 0; j < expCategory.length; j++){expCount.push(j)}

    let incomeList = incCount.map((i)=>{
        return (
            <ListGroup.Item action onClick={() => {
                handleShow();
                setId(incId[i]);
              }} variant="success" key={"inc"+i} className="d-flex justify-content-between align-items-start">
                <h5>{incCategory[i]}</h5>
            </ListGroup.Item>
        )
    })
    let expenseList = expCount.map((i)=>{
        return (
            <ListGroup.Item action onClick={() => {
                handleShow();
                setId(expId[i]);
              }} variant="danger" key={"exp"+i} className="d-flex justify-content-between align-items-start">
                <h5>{expCategory[i]}</h5>
            </ListGroup.Item>
        )
    })

    return(
        <>
            <h5>Kustuta kategooria:</h5>
                <Row>
                    <Col>{expenseList}</Col>
                    <Col>{incomeList}</Col>
                </Row>
                <Modal show={show} onHide={handleClose} centered className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Kustuta kindlalt?</Modal.Title>
                </Modal.Header>
                <Modal.Body className=" d-flex justify-content-between align-items-start">
                <Button variant="dark" onClick={handleClose}>Sulge</Button>
                <Button variant="danger" onClick={handleDelete}>Kustuta</Button>
                </Modal.Body>
            </Modal>
        </>)
}

export default Settings