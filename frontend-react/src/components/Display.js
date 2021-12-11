import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import jwt from 'jwt-decode'
require('dotenv').config()
const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Display(){
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState([]);
    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);
    const token = localStorage.getItem('token')
    const tokenDec = jwt(token)
    const owner = tokenDec.id;
    const balance = tokenDec.initBalance;

    useEffect(() => {
        axios.get(`${SERVER_URL}/transaction/user/${owner}`)
            .then(response => {
                const amountArray = [];
                const incomeArray = [];
                const expenseArray = [];
                for (var i = 0; i < response.data.length; i++) {
                    let amnt = response.data[i].amount;
                    if(response.data[i].ifIncome === 1){
                        incomeArray.push(amnt);
                        amountArray.push(amnt);
                    } else {
                        expenseArray.push(amnt);
                        amnt = -1 * amnt;
                        amountArray.push(amnt);
                    }
                    
                }
                setAmount(amountArray);
                setIncome(incomeArray);
                setExpense(expenseArray);
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, [owner])

    const sum = amount.reduce((a, b) => a + b, 0);      // https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    let Sum = Math.round((sum + Number.EPSILON) * 100) / 100; // Hoiab ära hiigel koma arve
    const incomesum = income.reduce((a, b) => a + b, 0); 
    let incomeSum = Math.round((incomesum + Number.EPSILON) * 100) / 100;
    const expensesum = expense.reduce((a, b) => a + b, 0);
    let expenseSum = Math.round((expensesum + Number.EPSILON) * 100) / 100;

    if (isLoading) {
        return (<div>Loading..</div>)
    } else {
        return(
            <div>
                <Card className="mt-5" style={{  textAlign: 'center' }}>
                    <Card.Body >
                        <Card.Subtitle style={{ fontSize: 14 }}>Konto summa:</Card.Subtitle>
                        <Card.Title style={{ fontSize: 45 }}>{Sum + balance}</Card.Title>
                        <Card.Subtitle style={{ fontSize: 14 }}>Tulud:</Card.Subtitle>
                        <Card.Title style={{ fontSize: 25 }}>{incomeSum}</Card.Title>
                        <Card.Subtitle style={{ fontSize: 14 }}>Kulud:</Card.Subtitle>
                        <Card.Title style={{ fontSize: 25 }}>{expenseSum}</Card.Title>
                        <Card.Subtitle style={{ fontSize: 14 }}>Vahe:</Card.Subtitle>
                        <Card.Title style={{ fontSize: 25 }}>{incomeSum - expenseSum}</Card.Title>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Display