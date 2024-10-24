import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faChartSimple, faCloudArrowDown, faCopy,
  faCreditCard,
  faEnvelope,
  faHouse,
  faMobileScreen, faPlus, faPlusCircle, faRightFromBracket, faUserAlt, faWarning
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css"
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import qrCodeImage from "./../assets/qr-wallet.png";

export function Header({ title }: { title: string }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    return () => {
      navigate("/login")
    }

  }
  return (
    <div className="header">
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/main/dashboard"  className={({ isActive, isPending,isTransitioning }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>
             <FontAwesomeIcon icon={faChartSimple} />
              <span>Дашборд</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/transactions" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>
              <FontAwesomeIcon icon={faArrowsRotate} />
              <span>Сделки</span>
            </NavLink>
          </li>
          {/*<li><a href="">
            <FontAwesomeIcon icon={faHouse} />
            <span>Споры</span>
          </a></li>*/}
          <li>
            <NavLink to="/main/details" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Реквизиты</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/devices" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
            }>
              <FontAwesomeIcon icon={faMobileScreen} />
              <span>Устройства</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/messages" className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Сообщения</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="subMenu">
        <div className="balance" onClick={handleShow}>
          <div>
            <p>Баланс</p>
            <p>1494 USDT</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <NavLink to="/main/profile" className={({ isActive, isPending }) =>
          isPending ? "pending user" : isActive ? "active user" : "user"
        }>
            <div>
              <FontAwesomeIcon icon={faUserAlt} />
            </div>
            <div>
              <p>Мой профиль</p>
              <p>ID: 13</p>
            </div>
        </NavLink>
        <div>
          <FontAwesomeIcon icon={faRightFromBracket} onClick={logout()} />
        </div>
      </div >

      <Modal show={show} onHide={handleClose} className="balance-add">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faPlusCircle} />
            <div className="title">Пополнение баланса</div>
            <div className="sub-title">
                Переведите нужную сумму в USDT на указанный кошелек или сканируйте QR-код
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="balance-body">

          <div className="wallet">
            <Form.Label htmlFor="messages_search">Кошелек для пополнения</Form.Label>
            <div className="wallet_row">
              <Form.Control
                readOnly={true}
                type="text"
                placeholder="0xee251F6f64eEA005a34E2AbdE1590C65e8247410"
                id="device_name"
              />
              <div className="icon">
                <FontAwesomeIcon icon={faCopy} />
              </div>

            </div>
          </div>
          <div className="qr">
            <div className="text">
              QR код для пополнения
            </div>
            <div className="qr-image">
              <img src={qrCodeImage} alt=""/>
            </div>
          </div>
          <div className="warning">
            <div className="icon">
              <FontAwesomeIcon icon={faWarning} />
            </div>
            <div className="text">
              Данный адрес предназначен только для перевода Tether в сети TRC20
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Подвтердить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    )

}
