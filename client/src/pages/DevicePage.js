import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import star from "../assets/star_FILL0_wght400_GRAD0_opsz24.svg";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import data from "bootstrap/js/src/dom/data";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className={"d-flex flex-column align-items-center"}>
                        <h2>{device.name}</h2>
                        <div style={{fontSize: 30}}>
                            {device.rating}
                            <Image width={30} height={30} src={star}/>
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className={"d-flex flex-column align-items-center justify-content-around"}
                        style={{width: 300, height: 300, fontSize: 34, border: "2px solid lightgray" }}
                    >
                        <h3>От: {device.price} byn</h3>
                        <Button variant={"outline-primary"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column mt-3"}>
                <h2>Характеристики</h2>
                {device.info.map(info =>
                    <Row key={info.id} className={"m-2 fs-5"}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;