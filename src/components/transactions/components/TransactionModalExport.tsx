import React, {PureComponent, useState} from 'react';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {ColumnDef, flexRender, getCoreRowModel, PaginationState, useReactTable} from "@tanstack/react-table";
import {fetchDataDevices, Transaction} from "../controllers/fetchData-transactions";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'


import "./../styles/transaction_list_page.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faCirclePlus,
  faCloudArrowDown,
  faPlus,
  faPlusCircle,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

export default function TransactionModalExport() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-dark"  onClick={handleShow}>
        <FontAwesomeIcon icon={faCloudArrowDown} />
        <span>Экспорт</span>
      </Button>
      <Modal show={show} onHide={handleClose} className="export">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCloudArrowDown} />
            <div className="title">Экспорт сделок</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="export-body">
          <div className="dates">
            <div className="from">
              <Form.Label htmlFor="messages_search">Дата с:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Дата: YYYY-MM-DD"
                id="device_name"
              />
            </div>
            <div className="to">
              <Form.Label htmlFor="messages_search">Дата по:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Дата: YYYY-MM-DD"
                id="device_name"
              />
            </div>
          </div>
          <div className="status">
            <Form.Label htmlFor="messages_search">Статус:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="devices">
            <Form.Label htmlFor="messages_search">Устройства:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="adresses">
            <Form.Label htmlFor="messages_search">Реквизиты:</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Выгрузить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
