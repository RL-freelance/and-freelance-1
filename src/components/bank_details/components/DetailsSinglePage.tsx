import React, {useState} from 'react';

import "./../styles/details_single.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faPlus, faRandom} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import {BankDetails, fetchDataDetails_list} from "../controllers/fetchData-details_list";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import TableSingle from "../../core/components/Table";
import {ColumnDef} from "@tanstack/react-table";
import {fetchDataTransactions, Transaction} from "../../transactions/controllers/fetchData-transactions";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";
import DetailsEditModal from "./modals/DetailsEditModal";
import {faker} from "@faker-js/faker";
import { defaultData } from "../controllers/fetchData-details_list";


export default function DetailsSinglePage({ data }: {data?: BankDetails}) {
  let table: any;
  const [show, setShow] = useState(false);

  const radios = [
    { name: 'Сделки', value: 'transactions' },
    { name: 'Сообщения', value: 'message' },
    { name: 'Пуши', value: 'pushes' },
  ];

  const columns = React.useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Заявка',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'date',
        header: 'Дата сделки',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Статус',
        footer: props => props.column.id,
        cell: (info) => <div className={
          info.getValue() === 'error' ? 'red status' :
            info.getValue() === 'active' ? 'gray status' : 'green status'
        }><span>.</span><span>{ (info.getValue()?.toString() || '')?.replace('_', ' ') }</span></div>,
      },
      {
        accessorKey: 'summStart',
        header: 'Сумма',
        footer: props => props.column.id,
        cell: (info) => (<div className="summStart">
          <span className="summStartSpan">{ (info.getValue()?.toString() || '') } USDT</span>
        </div>),
      },
      {
        accessorKey: 'summToSend',
        header: 'Сумма к начислению (-комиссия)',
        footer: props => props.column.id,
        cell: (info) => <div className="summToSend">
          <span>{ (info.getValue()?.toString() || '') } USDT</span>
        </div>,
      },
      {
        accessorKey: 'exchangeRate',
        header: 'Курс',
        footer: props => props.column.id,
        cell: (info) => <div className="exchangeRate">
          <span>1 USDT = </span><span>{ (info.getValue()?.toString() || '') }</span>
        </div>,
      }
    ],
    []
  )

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initTableFunction = (data: any) => {
    table = data.table;
  }

  const globalFilterFunction = () => {}

  return (
    <div className="details_single">

      <DetailsEditModal data={defaultData} handleClose={handleClose} handleShow={handleShow} show={show} />

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

      <RadioButtonsGroup
        id="groupRadio"
        defaultValue="transactions"
        radios={radios}
        triggerFunc={globalFilterFunction}
      ></RadioButtonsGroup>

      <TableSingle
        columnsData={columns}
        fetchFunc={fetchDataTransactions}
        initFunc={initTableFunction}
      />

    </div>
  );
}
