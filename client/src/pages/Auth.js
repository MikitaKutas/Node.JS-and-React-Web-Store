import React from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Form, Stack} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 650}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш E-mail"
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                    />
                    <Stack direction="horizontal" gap={2} className="mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTATION_ROUTE}>Зарегестрируйтесь</NavLink>
                            </div>
                                :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            className="ms-auto"
                            variant="outline-primary"
                        >
                            {isLogin ? 'Войти' : 'Зарегестрироваться'}
                        </Button>
                    </Stack>
                </Form>
            </Card>

        </Container>
    );
};

export default Auth;