import React from 'react'
import Card from 'react-bootstrap/Card'

function Display(){
    return(
        <div>
            <Card className="mt-5" style={{  textAlign: 'center' }}>
                <Card.Body >
                    <Card.Subtitle style={{ fontSize: 14 }}>Konto summa:</Card.Subtitle>
                    <Card.Title style={{ fontSize: 45 }}>4231,21</Card.Title>
                    <Card.Subtitle style={{ fontSize: 14 }}>Tulud:</Card.Subtitle>
                    <Card.Title style={{ fontSize: 25 }}>123,21</Card.Title>
                    <Card.Subtitle style={{ fontSize: 14 }}>Kulud:</Card.Subtitle>
                    <Card.Title style={{ fontSize: 25 }}>421,24</Card.Title>
                    <Card.Subtitle style={{ fontSize: 14 }}>Vahe:</Card.Subtitle>
                    <Card.Title style={{ fontSize: 25 }}>13,37</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Display