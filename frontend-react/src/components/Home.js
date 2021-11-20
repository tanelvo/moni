import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Display from './Display'
import Expenses from './Expenses'
import Income from './Income'




function Home(){

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className="expenses-section">
                            <Expenses/>
                        </div>
                    </Col>
                    <Col>
                        <div className="watcher-display">
                            <Display/>
                        </div>
                    </Col>
                    <Col>
                        <div className="income-section">
                            <Income/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home