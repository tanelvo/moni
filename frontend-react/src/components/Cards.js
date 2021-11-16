import React from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function Cards(props) {
    const { amount } = props;
    const { category } = props;
    const { color } = props;
    return(
        <Card >
            <Card.Body style={{background:{ color }}}>
                <Container>
                    <Row>
                        <Col>
                        <Card.Subtitle style={{ fontSize: 16, textAlign: "left" }}>{category}</Card.Subtitle>
                        </Col>
                        <Col>
                        <Card.Subtitle style={{ fontSize: 16, textAlign: "right" }}>{amount}</Card.Subtitle>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default Cards