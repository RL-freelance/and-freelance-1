import React, {useState} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faPlus, faRandom} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import {Device} from "../controllers/fetchData-devices";

import "./../styles/device_single.css";

export default function DeviceSinglePage({ data }: {data?: Device}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="device_single">
            <div className="device_single-header">
                <div className="item">
                    <FontAwesomeIcon icon={faRandom}></FontAwesomeIcon>
                    <div className="title">
                        <p className="name">
                            <span className="firstName">Виктор</span>
                            <span className="status red">Не активно</span>
                        </p>
                    </div>
                </div>
                <div className="item">
                    <Button variant="outline-dark" onClick={handleShow}>Перепривязать</Button>
                    <Button variant="outline-danger">Удалить</Button>
                    <Button variant="primary">Запустить</Button>
                </div>
            </div>
            <div className="device_single-content">
                <div className="item">
                    <div className="title">Состояние</div>
                    <div className="value">22%</div>
                </div>
                <div className="item">
                    <div className="title">Обновлено</div>
                    <div className="value">08.10.25 15.22</div>
                </div>
            </div>
        </div>
    );
}
