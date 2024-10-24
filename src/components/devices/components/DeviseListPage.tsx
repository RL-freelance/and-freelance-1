import React, {PureComponent, useState} from 'react';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {
  ColumnDef, FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  PaginationState,
  useReactTable
} from "@tanstack/react-table";
import {fetchDataDevices, Device} from "../controllers/fetchData-devices";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartSimple, faCirclePlus, faPlus, faPlusCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import MessagesModalView from "../../messages/components/MessagesModalView";
import DeviceModalView from "./modals/DeviceModalView";
import {BankDetails} from "../../bank_details/controllers/fetchData-details_list";
import {useNavigate} from "react-router-dom";

import "./../styles/device_list.css";
import {rankItem} from "@tanstack/match-sorter-utils";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";

let currentRow: Device;
export default function DeviseListPage() {
  const [radioValue, setRadioValue] = useState(1);

  const radios = [
    { name: 'Все', value: 'all' },
    { name: 'Активные', value: 'active' },
    { name: 'Не активные', value: 'disable' },
  ];

  const columns = React.useMemo<ColumnDef<Device>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'name',
        header: 'Устройство',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Статус',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'lastActivity',
        header: 'Последняя активность',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'battery',
        header: 'Батарея',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'speed',
        header: 'Скорость',
        footer: props => props.column.id,
      }
    ],
    []
  )


  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchDataDevices(pagination),
    placeholderData: keepPreviousData,
  })
  interface GlobalFilter {
    globalFilter: any
  }
  const defaultData = React.useMemo(() => [], [])
  const [globalFilter, setGlobalFilter] = useState<any>("")

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

  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const navigate = useNavigate();
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseModalView = () => setShowView(false);
  const handleShowModalView = function (row: any) {
    return () => {
      currentRow = { ...row?.original };
      return setShowView(true)
    }
  };

  const redirectToSinglePage = function (row: any) {
    return  () => {
      navigate("/main/devices/1");
    }
  }

  const globalFilterFunction = (e: any) => {
    if (e.target.value === 'all') {
      table.resetGlobalFilter();
    } else {
      table.setGlobalFilter(String(e.target.value));
    }
  }

  return (
    <div className="profile">
      <Modal show={showCreate} onHide={handleCloseCreate} className="new-device">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCirclePlus} />
            <div className="title">Добавление нового устройства</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="messages_search">Название устройств</Form.Label>
          <Form.Control
            type="text"
            placeholder="Придумайте название"
            id="device_name"
          />
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={handleCloseCreate}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleCloseCreate}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title">
        <h1>
          Устройства
        </h1>
        <div className="button">
          <Button variant="primary"  onClick={handleShowCreate}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Добавить устройство</span>
          </Button>
        </div>
      </div>
      <div className="table-content">
        <div className="filters">

          <RadioButtonsGroup
            defaultValue="all"
            id="group1"
            radios={radios}
            triggerFunc={globalFilterFunction}
          ></RadioButtonsGroup>

          <div className="search">
            <div className="search_title">
              <Form.Label htmlFor="messages_search">Поиск устройств</Form.Label>
              <Form.Control
                type="text"
                onChange={e => globalFilterFunction(e)}
                value={globalFilter || ""}
                placeholder="Введите ID устройства или название"
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
                <tr key={row.id} onClick={redirectToSinglePage(row)}>
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
          <DeviceModalView data={currentRow} show={showView} handleShow={handleShowModalView} handleClose={handleCloseModalView}/>

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
