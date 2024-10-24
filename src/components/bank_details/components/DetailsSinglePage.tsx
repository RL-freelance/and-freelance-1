import React, {useState} from 'react';

import "./../styles/details_single.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faPlus, faRandom} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {BankDetails} from "../controllers/fetchData-details_list";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function DetailsSinglePage({ data }: {data?: BankDetails}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="details_single">

      <Modal show={show} onHide={handleClose} className="new_details">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCirclePlus} />
            <div className="title">Редактирование реквизита</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="new_details-body">
          <div className="name field">
            <Form.Label htmlFor="messages_search">Имя реквизита:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Придумайте название"
                id="device_name"
            />
          </div>
          <div className="device field">
            <Form.Label htmlFor="messages_search">Устройство:</Form.Label>
            <Form.Select aria-label="Выберите устройство">
              <option>Выберите устройство</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="bank field">
            <Form.Label htmlFor="messages_search">Банк:</Form.Label>
            <Form.Select aria-label="Выберите банк">
              <option>Выберите банк</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="trafic field">
            <Form.Label htmlFor="messages_search">Трафик:</Form.Label>
            <Form.Select aria-label="Выберите трафик">
              <option>Выберите трафик</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="type field">
            <Form.Label htmlFor="messages_search">Тип реквизита:</Form.Label>
            <Form.Select aria-label="Выберите тип риквизита">
              <option>Выберите тип реквизита</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="card_number field" >
            <Form.Label htmlFor="messages_search">Номер карты:</Form.Label>
            <Form.Control
                type="text"
                placeholder="0000 0000 0000 0000"
                id="device_name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="details_single-header">
        <div className="item">
          <FontAwesomeIcon icon={faRandom}></FontAwesomeIcon>
          <div className="title">
            <p className="name">
              <span className="firstName">Железняк Анна Александровна</span>
              <span className="status red">Не активно</span>
            </p>
            <p className="bank">Deutch walle bank</p>
          </div>
        </div>
        <div className="item">
          <Button variant="danger">Заблокировать</Button>
          <Button variant="outline-danger">Удалить</Button>
          <Button variant="outline-dark" onClick={handleShow}>Редактировать</Button>
          <Button variant="primary">Возобновить</Button>
        </div>
      </div>
      <div className="details_single-content">
        <div className="item">
          <div className="title">Оборот</div>
          <div className="value">4450.02 USDT</div>
        </div>
        <div className="item">
          <div className="title">Баланс</div>
          <div className="value">0 USDT</div>
        </div>
        <div className="item">
          <div className="title">Прибыль</div>
          <div className="value">267.01</div>
        </div>
        <div className="item">
          <div className="title">Конверсия</div>
          <div className="value">64%</div>
        </div>

        <div className="item">
          <div className="title">Лимит</div>
          <div className="value">427 967 USDT</div>
        </div>
      </div>

      <div className="details_single-device">
        <div className="details_single-device-title">
          Устройство
        </div>
        <div className="details_single-device-content">
          <div className="item">
            <div className="title">Устройство</div>
            <div className="value">Железняк Анна</div>
          </div>
          <div className="item">
            <div className="title">Статус</div>
            <div className="value">
              <span className="status red">Не активно</span>
            </div>
          </div>
          <div className="item">
            <div className="title">Последняя активность</div>
            <div className="value">12.12.1912</div>
          </div>
          <div className="item">
            <div className="title">Реквизиты</div>
            <div className="value">1</div>
          </div>

          <div className="item">
            <div className="title">Состояние</div>
            <div className="value">
              <span className="status green">Онлайн</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
