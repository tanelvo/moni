import React from 'react';
import { ListGroup, Col, Row, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import HistoryTab from './HistoryTab';
import axios from 'axios';
import jwt from 'jwt-decode';
require('dotenv').config();
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState([]);
  const [date, setDate] = useState([]);
  const [ifInc, setInc] = useState([]);
  const [id, setId] = useState([]);
  const token = localStorage.getItem('token');
  const tokenDec = jwt(token);
  const owner = tokenDec.id;
  const Count = [];

  useEffect(() => {
    axios.get(`${SERVER_URL}/transaction/user/${owner}`)
        .then(response => {
          const amountArray = [];
          const categoryArray = [];
          const titleArray = [];
          const dateArray = [];
          const incArray = [];
          const idArray = [];
            for (var i = 0; i < response.data.length; i++) {
                amountArray.push(response.data[i].amount);
                categoryArray.push(response.data[i].category);
                titleArray.push(response.data[i].title);
                dateArray.push((response.data[i].creationDate).substring(0,10));
                idArray.push(response.data[i]._id)
                if(response.data[i].ifIncome === 1){
                  incArray.push("success");
                } else {
                  incArray.push("danger")
                }
                  
            }
            setAmount(amountArray);
            setCategory(categoryArray);
            setTitle(titleArray);
            setDate(dateArray);
            setId(idArray);
            setInc(incArray);
            setIsLoading(false);
        })
        .catch(error => console.error(error));
  }, [owner])

  for(var i = 0; i < amount.length; i++){Count.push(i)}
  let itemList =Count.map((i)=>{
    return(
      <ListGroup.Item action href={"#link"+i}  className="d-flex justify-content-between align-items-start" variant={ifInc[i]} key={"key"+i}>
        <h5>{title[i]}</h5>
        <h5>{amount[i]}</h5>
      </ListGroup.Item>
    )
  })
  let cardList =Count.map((i)=>{
    return (
      <Tab.Pane eventKey={"#link"+i} key={"key"+i}>
        <HistoryTab category={category[i]} amount={amount[i]} title={title[i]} date={date[i]} id={id[i]} border="#999"/>
      </Tab.Pane>
    )
  })
  if (isLoading) {
    return (<div>Loading..</div>)
  } else {
    return(
        <>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item className="d-flex justify-content-between align-items-start" variant="dark">
                    <h5>Kirjeldus:</h5>
                    <h5>Summa:</h5>
                  </ListGroup.Item>
                  {itemList}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {cardList}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </>
    )
  }
}

export default History