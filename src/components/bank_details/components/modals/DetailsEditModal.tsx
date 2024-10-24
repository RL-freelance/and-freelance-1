import React, {PureComponent, useState} from 'react';



import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

import "./../../styles/details_single.css";
import {BankDetails, defaultData} from "../../controllers/fetchData-details_list";
import {faker} from "@faker-js/faker";



export default function DetailsEditModal({ data, show, handleShow, handleClose}: { data: BankDetails, show: boolean, handleShow: Function, handleClose: Function}) {
  const closeAction = () => {
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={closeAction} className="new_details">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCirclePlus} />
            <div className="title">Редактирование реквизита</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="new_details-body">
          <div className="name field">
            <Form.Label htmlFor="messages_search">Название реквизита:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Придумайте название"
            />
          </div>
          <div className="device field">
            <Form.Label htmlFor="messages_search">Счета:</Form.Label>
            <Form.Control
              type="text"
              value={defaultData.countNumber}
              placeholder="Придумайте название"
              readOnly={ true }
            />
          </div>
          <div className="trafic field">
            <Form.Label htmlFor="messages_search">Трафик:</Form.Label>
            <Form.Select aria-label="Выберите трафик" >
              <option>Выберите трафик</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="type field">
            <Form.Label htmlFor="messages_search">Лимит суммы операций (в сутки):</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
            />
          </div>

          <div className="type field">
            <Form.Label htmlFor="messages_search">Лимит кол-ва операций (в сутки):</Form.Label>
            <Form.Control
              type="number"
              defaultValue={0}
            />
          </div>


          <div className="type field">
            <Form.Label htmlFor="messages_search">% добавочной стоимости:</Form.Label>
            <Form.Range defaultValue={0} min={-0.5} max={0} step={0.01}/>
            <div className="range_values">
              <div className="min">-0.5%</div>
              <div className="max">0%</div>
            </div>
          </div>


          <div className="type field">
            <Form.Label htmlFor="messages_search">сумма добавочной стоимости:</Form.Label>
            <Form.Range defaultValue={0} min={10} max={300} step={10} />
            <div className="range_values">
              <div className="min">10K</div>
              <div className="max">300K</div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={closeAction}>
            Отмена
          </Button>
          <Button variant="primary" onClick={closeAction}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
