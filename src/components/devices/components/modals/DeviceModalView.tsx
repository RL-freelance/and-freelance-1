import React, {PureComponent, useState} from 'react';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {ColumnDef, flexRender, getCoreRowModel, PaginationState, useReactTable} from "@tanstack/react-table";

import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'



import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChartSimple,
    faCirclePlus,
    faCloudArrowDown, faMessage, faMoneyBillTransfer,
    faPlus,
    faPlusCircle,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {Device} from "../../controllers/fetchData-devices";

import "../../styles/device_modal_view.css";

export default function DeviceModalView({ data, show, handleShow, handleClose}: { data: Device, show: boolean, handleShow: Function, handleClose: Function}) {
 const closeAction = () => {
   handleClose();
 }
  return (
    <>
      <Modal show={show} onHide={closeAction} className="view">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faMessage} />
            <div className="title">Просмотр устройства</div>
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
            <div className="item_title">Название:</div>
            <div className="item_value">{data?.name}</div>
          </div>
          <div className="item">
            <div className="item_title">Батарея:</div>
            <div className="item_value">{data?.battery}</div>
          </div>
          <div className="item">
            <div className="item_title">Скорость:</div>
            <div className="item_value">{data?.speed}</div>
          </div>
          <div className="item">
            <div className="item_title">Дата последней активности:</div>
            <div className="item_value">{data?.lastActivity}</div>
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
