import React, {PureComponent, useRef, useState} from 'react';


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
  faCloudArrowDown, faMoneyBillTransfer,
  faPlus,
  faPlusCircle,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import "../styles/transaction_modal_details.css"
export default function TransactionModalView({ data, show, handleShow, handleClose}: { data: Transaction, show: boolean, handleShow: Function, handleClose: Function}) {

  const closeAction = () => {
    handleClose();
  }
  return (
    <>
      <Modal show={show} onHide={closeAction} className="view">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faMoneyBillTransfer} />
            <div className="title">Просмотр сделки</div>
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
            <div className="item_title">Дата:</div>
            <div className="item_value">{data?.date}</div>
          </div>
          <div className="item">
            <div className="item_title">Сумма перевода:</div>
            <div className="item_value">{data?.summStart}</div>
          </div>
          <div className="item">
            <div className="item_title">Сумма полученная:</div>
            <div className="item_value">{data?.summToSend}</div>
          </div>
          <div className="item">
            <div className="item_title">Курс обмена:</div>
            <div className="item_value">{data?.exchangeRate}</div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={closeAction} >
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
