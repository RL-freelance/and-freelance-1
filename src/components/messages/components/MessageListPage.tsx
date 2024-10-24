import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import {
  ColumnDef,
} from '@tanstack/react-table'
import {fetchData, Message} from "../controllers/fetchData";
import MessagesModalView from "./MessagesModalView";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";
import TableSingle from "../../core/components/Table";

import '../styles/message_list.css';

let currentRow: Message;
function MessageListPage() {
  const [radioValueTypes, setRadioValueTypes] = useState('messages');
  const [radioValueSubTypes, setRadioValueSubTypes] = useState('all');

  const radiosTypes = [
    { name: 'Сообщения', value: 'messages' },
    { name: 'Пуши', value: 'pushes' },
  ];
    const [show, setShow] = useState(false);

  const radiosSubTypes = [
    { name: 'Все', value: 'all' },
    { name: 'Определено', value: 'definite' },
    { name: 'Нет совпадений', value: 'no_matches' },
    { name: 'Не распознано', value: 'not_recognized' },
  ];

  const columns = React.useMemo<ColumnDef<Message>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'from',
        header: 'От кого',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Статус',
        footer: props => props.column.id,
        cell: (info) => <div className={
            info.getValue() === 'no_matches' ? 'red' :
            info.getValue() === 'not_recognized' ? 'gray' : 'green'
        }><span>.</span><span>{ (info.getValue()?.toString() || '').replace('_', ' ') }</span></div>,
      },
      {
        accessorKey: 'message',
        header: 'Сообщение',
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
        accessorKey: 'user',
        header: 'Пользователь',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'dateCreated',
        header: 'Получено',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'dateRead',
        header: 'Прочитано',
        footer: props => props.column.id,
      },
    ],
    []
  )

  const [globalFilterSearch, setGlobalFilterSearch] = useState<any>("")

  let table:any;
  const initTableFunction = (data: any) => {
      table = data.table;
  }

  const globalFilterFunction = (e: any, type: any) => {
    if (type === 'status') {
      if (e.target.value === 'all') {

        table.resetGlobalFilter();
      } else {
        table.setGlobalFilter(String(e.target.value));
      }
    }

    if (type === 'search') {
      setRadioValueSubTypes('All')
      table.resetGlobalFilter();

        setGlobalFilterSearch(String(e.target.value));
        table.setGlobalFilter(String(e.target.value));
    }

  }

    const handleCloseModalView = () => setShow(false);
    const handleShowModalView = function (row: any) {
      currentRow = { ...row?.original };
      return setShow(true)
    };

  return (
    <div className="messages">
      <div className="title">
        <h1>Сообщения</h1>
      </div>
      <div className="content">
        <RadioButtonsGroup
          key="group_types"
          id="group_types"
          className="group_types"
          defaultValue="messages"
          radios={radiosTypes}
          triggerFunc={setRadioValueTypes}
        ></RadioButtonsGroup>

        <RadioButtonsGroup
          key="group_sub_types"
          id="group_sub_types"
          className="group_sub_types"
          defaultValue="all"
          radios={radiosSubTypes}
          triggerFunc={(e: any) => globalFilterFunction(e, "status")}
        ></RadioButtonsGroup>

        <div className="search">
          <div className="search_title">
            <Form.Label htmlFor="messages_search">Поиск по сообщению</Form.Label>
            <Form.Control
              type="text"
              value={globalFilterSearch}
              onChange={e => globalFilterFunction(e, "search")}
              id="messages_search"
            />
          </div>
        </div>

      </div>

      <TableSingle
        columnsData={columns}
        fetchFunc={fetchData}
        rowActionFunc={handleShowModalView}
        initFunc={initTableFunction}
      ></TableSingle>

      <MessagesModalView
        data={currentRow}
        show={show}
        handleShow={ handleShowModalView}
        handleClose={handleCloseModalView}
      />

    </div>
  );
}

export default MessageListPage;
