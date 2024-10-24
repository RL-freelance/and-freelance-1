import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable, FilterFn, getFilteredRowModel, getSortedRowModel, getPaginationRowModel,
} from '@tanstack/react-table'
import {fetchData, Message} from "../controllers/fetchData";
import MessagesModalView from "./MessagesModalView";
import {rankItem} from "@tanstack/match-sorter-utils";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";

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

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  const defaultData = React.useMemo(() => [], [])
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
      itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
  }
  const [globalFilter, setGlobalFilter] = useState<any>("")
  const [globalFilterSearch, setGlobalFilterSearch] = useState<any>("")
  const table = useReactTable({
    data: dataQuery.data?.allData ?? defaultData,
    columns,
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const globalFilterFunction = (e: any, type: any) => {
    if (type === 'status') {
      if (e.target.value === 'all') {

        table.resetGlobalFilter();
      } else {
        table.setGlobalFilter(String(e.target.value));
      }
    }

    if (type === 'search') {
      console.log('search')
      setRadioValueSubTypes('All')
      table.resetGlobalFilter();

        setGlobalFilterSearch(String(e.target.value));
        table.setGlobalFilter(String(e.target.value));
    }

  }
    const handleCloseModalView = () => setShow(false);
    const handleShowModalView = function (row: any) {
        return () => {
            currentRow = { ...row?.original };
            return setShow(true)
        }
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
      <div className="table">
        <table>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map(row => {
            return (
                <tr key={row.id} onClick={handleShowModalView(row)}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} >

                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
            )
          })}
          </tbody>
        </table>
          <MessagesModalView data={currentRow} show={show} handleShow={ handleShowModalView} handleClose={handleCloseModalView}/>
        <div className="pagination flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
          <span className=" flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

        </div>
        <div className="loading">
          {dataQuery.isFetching ? 'Loading...' : null}
        </div>
      </div>
    </div>
  );
}

export default MessageListPage;
