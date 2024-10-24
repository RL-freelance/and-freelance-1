
import React, {PureComponent, useState} from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

import "./../styles/login.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const redirectToDashboard = () => {
        return  () => {
            navigate("/main/dashboard");
        }
    }
    return (
        <div className="login-content">
            <div className="login">
                <h1>Login</h1>
                <div className="login_form">
                    <div className="lgoin-form_email">
                        <Form.Label htmlFor="messages_search">Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите email"
                            id="messages_search"
                        />
                    </div>
                    <div className="lgoin-form_password">
                        <Form.Label htmlFor="messages_search">Пароль:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            id="messages_search"
                        />
                    </div>
                    <div className="footer">
                        <Button variant="primary" type="submit" onClick={redirectToDashboard()}>Войти</Button>
                    </div>
                </div>
            </div>
        </div>

    );
}
