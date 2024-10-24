import React, {PureComponent, useState} from 'react';
import {ColumnDef, flexRender, getCoreRowModel, PaginationState, useReactTable} from "@tanstack/react-table";
import {fetchDataProfile, Profile} from "../controllers/fetchData";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";

import "./../styles/profile_list.css";
import TableSingle from "../../core/components/Table";
import {fetchDataDevices} from "../../devices/controllers/fetchData-devices";
export default function ProfileListPage() {
  let table:any;

  const [radioValue, setRadioValue] = useState('sessions');

  const radios = [
    { name: 'Сессии', value: 'sessions' },
    { name: 'Транзакции', value: 'transactions' },
  ];

  const columns = React.useMemo<ColumnDef<Profile>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'date',
        header: 'Дата транзакции',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'information',
        header: 'Информация',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'summ',
        header: 'Сумма',
        footer: props => props.column.id,
        cell: (info2: any) => <div className="message-item" >
          <div className="message-item_content">
            { info2.getValue() }
          </div>
          <div className="message-item_tooltip">
            { info2.getValue() }
            { info2.getValue() }
            { info2.getValue() }
            { info2.getValue() }
            { info2.getValue() }
          </div>
        </div>,
      },
      {
        accessorKey: 'balance',
        header: 'Баланс',
        footer: props => props.column.id,
      },
    ],
    []
  )


  const initTableFunc = (e:any) => {
    table = e.table;
  }

  return (
    <div className="profile">
      <div className="title">
        <h1>
          <FontAwesomeIcon icon={faUser} /> user213151451
        </h1>
      </div>
      <div className="content">
        <div className="item">
          <div className="item-row">
            <div className="title">ID:</div>
            <div className="value"> 531</div>
          </div>
          <div className="item-row">
            <div className="title">Вход первичный трафик:</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Вход первичный трафик</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Вход первичный трафик</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Вход первичный трафик</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Вход банк:</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Выход внутр. банк:</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Выход меж. банк:</div>
            <div className="value">6%</div>
          </div>
          <div className="item-row">
            <div className="title">Выход:</div>
            <div className="value">1%</div>
          </div>
        </div>
        <div className="item">
          <div className="item-row">
            <div className="title">Created at:</div>
            <div className="value">date</div>
          </div>
        </div>
      </div>
      <div className="table-content">
        <div className="filters">
          <RadioButtonsGroup
            id="group1"
            defaultValue="sessions"
            radios={radios}
            triggerFunc={setRadioValue}
          ></RadioButtonsGroup>
        </div>


        <TableSingle
          columnsData={columns}
          fetchFunc={fetchDataProfile}
          initFunc={initTableFunc}
        />

      </div>
    </div>
  );
}
