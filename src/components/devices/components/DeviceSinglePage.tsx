import React, {useState} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faPlus, faRandom} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import {Device} from "../controllers/fetchData-devices";

import "./../styles/device_single.css";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";
import TableSingle from "../../core/components/Table";
import {fetchDataTransactions, Transaction} from "../../transactions/controllers/fetchData-transactions";
import {ColumnDef} from "@tanstack/react-table";

export default function DeviceSinglePage({ data }: {data?: Device}) {
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

    const initTableFunction = (e: any) => {
      table = e.table;
    }

    const globalFilterFunction = () => { };

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
