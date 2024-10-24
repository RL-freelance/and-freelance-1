import React, {useState} from 'react';
import {
  ColumnDef,
} from "@tanstack/react-table";
import {fetchDataTransactions, Transaction} from "../controllers/fetchData-transactions";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";
import TransactionModalExport from "./TransactionModalExport";
import TransactionModalView from "./TransactionModalView";
import TableSingle from "../../core/components/Table";

import "./../styles/transaction_list_page.css";
let currentRow: Transaction;
export default function TransactionsListPage() {

  const [show, setShow] = useState(false);

  const radios = [
    { name: 'Все', value: 'all' },
    { name: 'Активные', value:'active' },
    { name: 'Успешные', value: 'successful' },
    { name: 'Ошибка', value: 'error' },
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

  let table: any;

  const initTableFunction = (data: any) => {
    table = data.table;
  }
  const globalFilterFunction = (e: any) => {
    if (e.target.value === 'all') {
      table.resetGlobalFilter();
    } else {
      table.setGlobalFilter(String(e.target.value));
    }
  }

  const handleCloseTransactionView = () => setShow(false);
  const handleShowTransactionView = function (row: any) {
    currentRow = { ...row?.original };
    return setShow(true)
  };

  return (
    <div className="profile">
       <div className="title">
        <h1>
          Сделки
        </h1>
        <div className="button">
          <TransactionModalExport/>
        </div>
      </div>
      <div className="table-content">
        <div className="filters">
          <RadioButtonsGroup
            id="group1"
            defaultValue="all"
            radios={radios}
            triggerFunc={globalFilterFunction}
          />
        </div>

        <TableSingle
          columnsData={columns}
          fetchFunc={fetchDataTransactions}
          rowActionFunc={handleShowTransactionView}
          initFunc={initTableFunction}
        />

        <TransactionModalView
          data={currentRow}
          show={show}
          handleShow={ handleShowTransactionView}
          handleClose={handleCloseTransactionView}
        />
      </div>
    </div>
  );
}
