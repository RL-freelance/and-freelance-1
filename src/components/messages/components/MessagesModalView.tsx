import React, {PureComponent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faMessage
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {Message} from "../controllers/fetchData";

import "../styles/message_modal_details.css"

export default function MessagesModalView({ data, show, handleShow, handleClose}: { data: Message, show: boolean, handleShow: Function, handleClose: Function}) {

  const closeAction = () => {
    handleClose();
  }

  return (
    <>
      <Modal show={show} onHide={closeAction} className="view">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faMessage} />
            <div className="title">Просмотр сообщения</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="view-body">
          <div className="item">
            <div className="item_title">ID:</div>
            <div className="item_value">{data?.id}</div>
          </div>
          <div className="item">
            <div className="item_title">Статус:</div>
            <div className="item_value">{data?.status}</div>
          </div>
          <div className="item">
            <div className="item_title">Сообщение:</div>
            <div className="item_value">{data?.message}</div>
          </div>
          <div className="item">
            <div className="item_title">От кого:</div>
            <div className="item_value">{data?.from}</div>
          </div>
          <div className="item">
            <div className="item_title">Дата создания:</div>
            <div className="item_value">{data?.dateCreated}</div>
          </div>
          <div className="item">
            <div className="item_title">Дата прочтения:</div>
            <div className="item_value">{data?.dateRead}</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={closeAction}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
