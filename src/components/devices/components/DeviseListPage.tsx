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
import TableSingle from "../../core/components/Table";

let currentRow: Device;
export default function DeviseListPage() {
  let table: any;
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState<any>("")
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);

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

  const initTableFunction = (data: any) => {
    table = data.table;
  }


  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseModalView = () => setShowView(false);
  const handleShowModalView = function (row: any) {
    currentRow = { ...row?.original };
    return setShowView(true)
  };

  const redirectToSinglePage = function (row: any) {
    navigate("/main/devices/1");
  }

  const globalFilterFunction = (e: any) => {
    if (e.target.value === 'all') {
      table.resetGlobalFilter();
    } else {
      setGlobalFilter(String(e.target.value));
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

        <TableSingle
          columnsData={columns}
          fetchFunc={fetchDataDevices}
          rowActionFunc={redirectToSinglePage}
          initFunc={initTableFunction}
        />

        <DeviceModalView
          data={currentRow}
          show={showView}
          handleShow={handleShowModalView}
          handleClose={handleCloseModalView}
        />

      </div>
    </div>
  );
}
