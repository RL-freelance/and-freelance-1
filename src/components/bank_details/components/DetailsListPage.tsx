import React, {PureComponent, useState} from 'react';


import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
  PaginationState,
  useReactTable
} from "@tanstack/react-table";
import {fetchDataDetails_list, BankDetails} from "../controllers/fetchData-details_list";
import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'


import "./../styles/details_list.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartSimple, faCirclePlus, faPlus, faPlusCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {redirect, redirectDocument, useNavigate} from "react-router-dom";
import {rankItem} from "@tanstack/match-sorter-utils";
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";


export default function DetailsListPage() {
  const [radioValue1, setRadioValue1] = useState(2);
  const radios1 = [
    { name: 'Все', value: 'all' },
    { name: 'Активные', value: 'active' },
    { name: 'Не активные', value: 'disable' },
    { name: 'Заблокированные', value: 'block' }
  ];



  const columns = React.useMemo<ColumnDef<BankDetails>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'name',
        header: 'Имя владельца',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'phone',
        header: 'Телефон',
        footer: props => props.column.id,
        cell: (row) => <span>+{ row.getValue()?.toString() }</span>
      },
      {
        accessorKey: 'countNumber',
        header: 'Номер владельца',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Статус',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'balance',
        header: 'Текущий баланс',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'limitCount',
        header: 'Лимит',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'dellCount',
        header: 'Процент сделок',
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
    queryFn: () => fetchDataDetails_list(pagination),
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

  const globalFilterFunction = (e:any) => {
    if (e.target.value === 'all') {
      table.resetGlobalFilter();
    } else {
      table.setGlobalFilter(String(e.target.value));
    }
  }

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const redirectToDetailsSingle = function (row: any) {
    return  () => {
      navigate("/main/details/1");
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="details_list">
      <Modal show={show} onHide={handleClose} className="new_details">
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faCirclePlus} />
            <div className="title">Добавление нового реквизита</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="new_details-body">
          <div className="name field">
            <Form.Label htmlFor="messages_search">Имя реквизита:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Придумайте название"
              id="device_name"
            />
          </div>
          <div className="device field">
            <Form.Label htmlFor="messages_search">Устройство:</Form.Label>
            <Form.Select aria-label="Выберите устройство">
              <option>Выберите устройство</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="bank field">
            <Form.Label htmlFor="messages_search">Банк:</Form.Label>
            <Form.Select aria-label="Выберите банк">
              <option>Выберите банк</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="trafic field">
            <Form.Label htmlFor="messages_search">Трафик:</Form.Label>
            <Form.Select aria-label="Выберите трафик">
              <option>Выберите трафик</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="type field">
            <Form.Label htmlFor="messages_search">Тип реквизита:</Form.Label>
            <Form.Select aria-label="Выберите тип риквизита">
              <option>Выберите тип реквизита</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="card_number field" >
            <Form.Label htmlFor="messages_search">Номер карты:</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000 0000 0000 0000"
              id="device_name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modal_footer">
          <Button variant="outline-dark" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title">
        <h1>
          Реквизит
        </h1>
        <div className="button">
          <Button variant="primary"  onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Добавить реквизит</span>
          </Button>
        </div>
      </div>
      <div className="table-content">
        <div className="filters">

          <RadioButtonsGroup
            id="groupRadio"
            defaultValue="all"
            radios={radios1}
            triggerFunc={globalFilterFunction}
          ></RadioButtonsGroup>

          <div className="search">
            <div className="search_title">
              <Form.Label htmlFor="messages_search">Поиск устройств</Form.Label>
              <Form.Control
                type="text"
                onChange={e => globalFilterFunction(e)}
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
                <tr key={row.id} onClick={redirectToDetailsSingle(row)}>

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
