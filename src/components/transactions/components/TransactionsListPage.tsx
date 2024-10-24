import React, {PureComponent, useState} from 'react';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {
  ColumnDef, ColumnFiltersState, FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  PaginationState,
  useReactTable
} from "@tanstack/react-table";
import {fetchDataDevices, Transaction} from "../controllers/fetchData-transactions";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import TransactionModalExport from "./TransactionModalExport";
import TransactionModalView from "./TransactionModalView";
import {
  rankItem,
} from '@tanstack/match-sorter-utils'

let currentRow: Transaction;

import "./../styles/transaction_list_page.css";
export default function TransactionsListPage() {

  const [radioValue1, setRadioValue1] = useState('all');
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState<any>("")
  const [show, setShow] = useState(false);

  const radios1 = [
    { name: 'Все', value: 'all' },
    { name: 'Активные', value:'active' },
    { name: 'Успешные', value: 'successful' },
    { name: 'Ошибка', value: 'error' },
  ];

  const defaultData = React.useMemo(() => [], [])
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


  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchDataDevices(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })


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

  const globalFilterFunction = (e: any) => {
    if (e.target.value === 'all') {
      table.resetGlobalFilter();
    } else {
      table.setGlobalFilter(String(e.target.value));
    }
  }

  const handleCloseTransactionView = () => setShow(false);
  const handleShowTransactionView = function (row: any) {
   return () => {
     currentRow = { ...row?.original };
     return setShow(true)
   }
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
          <ToggleButtonGroup name="group1" type="radio" defaultValue={['all']} className="group-1">
            {radios1.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`group1-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-secondary' : 'outline-secondary'}
                name="group1"
                value={radio.value}
                checked={radioValue1 === radio.value}
                onChange={(e) => globalFilterFunction(e)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="table">
          <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}  onClick={handleShowTransactionView}>
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
            {table.getRowModel().rows.map(function (row) {
              return (
                <tr key={row.id} onClick={handleShowTransactionView(row)}>
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
          <TransactionModalView data={currentRow} show={show} handleShow={ handleShowTransactionView} handleClose={handleCloseTransactionView}/>
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
    </div>
  );
}
