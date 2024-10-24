import React, {PureComponent, useState} from 'react';
import {ColumnDef, flexRender, getCoreRowModel, PaginationState, useReactTable} from "@tanstack/react-table";
import {fetchData, Profile} from "../controllers/fetchData";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";

import "./../styles/profile_list.css";
export default function ProfileListPage() {
  const [radioValue, setRadioValue] = useState(2);
  const radios = [
    { name: 'Сессии', value: 1 },
    { name: 'Транзакции', value: 2 },
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

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: dataQuery.data?.rowCount, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  })

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
                <tr key={row.id} >
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
