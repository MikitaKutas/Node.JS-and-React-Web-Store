import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Stack} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Smart Store</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {user.isAuth ?
                        <Nav className="justify-content-end flex-grow-1" style={{color: 'white'}}>
                            <Stack direction="horizontal" gap={2}>
                                <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Панель админа</Button>
                                <Button variant={"outline-light"} onClick={() => logout()} >Выйти</Button>
                            </Stack>
                        </Nav>
                            :
                        <Nav className="justify-content-end flex-grow-1" style={{color: 'white'}}>
                            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Войти</Button>
                        </Nav>
                        }
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;