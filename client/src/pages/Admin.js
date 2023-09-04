import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button} from "react-bootstrap";
import CreateType from "../modals/CreateType";
import CreateBrand from "../modals/CreateBrand";
import CreateDevice from "../modals/CreateDevice";

const Admin = () => {
    const [brandVisibility, setBrandVisibility] = useState(false)
    const [typeVisibility, setTypeVisibility] = useState(false)
    const [deviceVisibility, setDeviceVisibility] = useState(false)

    return (
        <Container className={"d-flex flex-column"}>
            <Button
                variant={"outline-dark"}
                className={"mt-3"}
                onClick={() => setTypeVisibility(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-3"}
                onClick={() => setBrandVisibility(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-3"}
                onClick={() => setDeviceVisibility(true)}
            >
                Добавить устройство
            </Button>
            <CreateBrand show={brandVisibility} onHide={() => setBrandVisibility(false)}/>
            <CreateType show={typeVisibility} onHide={() => setTypeVisibility(false)}/>
            <CreateDevice show={deviceVisibility} onHide={() => setDeviceVisibility(false)}/>
        </Container>
    );
};

export default Admin;