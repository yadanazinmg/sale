import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Vaccine, EditIcon, DeleteIcon } from "../../assets/icons/svg_icons";
import LoadingIndicator from "../../components/loading_indicator";
import DatePicker from "react-datepicker";
import paths from "../../routes/paths";
import withUser from "../../hocs/with_user";
import { get_parking_record_by_Time } from "../../graphql/parking_record";
import { dateFormatter } from "../../helpers/ag_grid_helpers";
import { DetailsExcelExport } from "../../helpers/excel_helper";
import { get_exit_gate } from "../../graphql/gate";

// const dateFormatter = (params) => {
//   return moment(params.value).format("DD/MM/YYYY");
// };

const DetailReportPage = (props) => {
  const {
    loading: gloading,
    error,
    data: gates,
    refetch,
  } = useQuery(get_exit_gate, {
    pollInterval: 0,
    fetchPolicy: "network-only",
    variables: {
      where: {
        gate_type: {
          equals: "EXIT",
        },
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
    },
  });
  const [getTicketRecord, { loading: gqlLoading, data: ticketrecord }] = useLazyQuery(get_parking_record_by_Time, {
    fetchPolicy: "network-only",
  });

  const [parkingrecord, setParkingRecord] = useState([]);
  const [sdate, setsDate] = useState();
  const [edate, seteDate] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [count, setCount] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);
  const [vehicleid, setVehicleId] = useState();
  const [vehicleclass, SetVehicleClass] = useState();
  const [parkingtype, SetParkingType] = useState("0");
  const [gate, SetGate] = useState();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGet = () => {
    setParkingRecord([]);
    console.log(vehicleclass);
    console.log(parkingtype);
    console.log(gate);
    if (parkingtype === "2") {
      console.log("In parking 2");
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                vehicle_class: {
                  equals: vehicleclass,
                },
                vehicle_id: {
                  equals: vehicleid,
                },
                exit_gate_id: {
                  equals: gate,
                },
                exit_time: {
                  not: null,
                  gte: sdate,
                  lte: edate,
                },
              },
            ],
          },
        },
      });
    } else if (parkingtype === "1") {
      console.log("In parking 1");
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                vehicle_class: {
                  equals: vehicleclass,
                },
                vehicle_id: {
                  equals: vehicleid,
                },
                entry_time: {
                  gte: sdate,
                  lte: edate,
                },
                exit_time: {
                  equals: null,
                },
                exit_gate_id: {
                  equals: gate,
                },
              },
            ],
          },
        },
      });
    } else {
      getTicketRecord({
        variables: {
          where: {
            OR: [
              {
                entry_time: {
                  gte: sdate,
                  lte: edate,
                },
                exit_time: {
                  gte: sdate,
                  lte: edate,
                },
              },
            ],
            AND: [
              {
                vehicle_class: {
                  equals: vehicleclass,
                },
                vehicle_id: {
                  equals: vehicleid,
                },
                exit_gate_id: {
                  equals: gate,
                },
              },
            ],
          },
        },
      });
    }
  };

  const handleVehicleId = (e) => {
    console.log(e.target.value);
    setVehicleId(e.target.value);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    gridApi.setQuickFilter(e.target.value);
    //
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      { field: "vehicle_id", width: 100 },
      { field: "vehicle_class", width: 100 },
      { field: "entry_time", valueFormatter: dateFormatter },
      { field: "exit_time", valueFormatter: dateFormatter },
      { field: "shift_id" },
      { field: "collected_amount" },
      { field: "slip_number" },
      // { field: "Doses", cellStyle: { textAlign: "center" }, width: 100, cellRendererFramework: doseLinkRenderer },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextBoxChanged = () => {
    gridOptions.api.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  const handleExport = () => {
    DetailsExcelExport(parkingrecord, sdate, edate, vehicleid, vehicleclass);
  };

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(ticketrecord);
    if (!gqlLoading && ticketrecord) {
      console.log(ticketrecord.parkingRecords);
      setParkingRecord(ticketrecord.parkingRecords);
      setCount(ticketrecord.parkingRecords.length);
      const tmp = ticketrecord.parkingRecords;
      console.log(tmp);
      let total = tmp.reduce((a, c) => a + c.collected_amount, 0);
      console.log(total);
      setTotalPrice(total);
    }
  }, [gqlLoading]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row py-1 place-content-center">
        <span className="text-3xl font-semibold capitalize mb-2">Details Report</span>
      </div>
      <div className="w-full flex flex-wrap p-1 pb-2">
        <div className="flex flex-wrap">
          <div className="flex flex-nowrap mt-2">
            <DatePicker
              id="Time"
              name="Time"
              placeholderText="From Time"
              selected={sdate}
              maxDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              onChange={(date) => setsDate(date)}
              autoComplete="off"
              dateFormat="dd/MM/yyyy HH:mm"
              enableCellTextSelection={true}
              className="input input-primary input-sm px-2 w-36"
            />
          </div>
          <div className="flex flex-nowrap mx-2 mt-2">
            <DatePicker
              id="Time"
              name="Time2"
              placeholderText="To Time"
              selected={edate}
              maxDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              onChange={(date) => seteDate(date)}
              autoComplete="off"
              dateFormat="dd/MM/yyyy HH:mm"
              className="input input-primary input-sm w-36"
            />
          </div>
          <div className="flex flex-nowrap mt-2">
            <select id="vehicle_class" className="select select-primary select-sm" onChange={(e) => SetVehicleClass(e.target.value)}>
              <option value="">Entry Type</option>
              {VehicleClass.map((r) => (
                <option value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-nowrap mx-2 mt-2">
            <select id="parking_type" className="select select-primary select-sm" onChange={(e) => SetParkingType(e.target.value)}>
              <option value="">Parking Type</option>
              {ParkingType.map((r) => (
                <option value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-nowrap mt-2">
            <select id="gate" className="select select-primary select-sm" onChange={(e) => SetGate(e.target.value)}>
              <option value="">Select Exit Gate</option>
              {gates && gates.gates.map((r) => <option value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex flex-nowrap mt-2">
            <input className="input input-primary input-sm w-48" type="text" placeholder="Vehicle Id" onChange={handleVehicleId} />
          </div>
          <div className="flex flex-nowrap mx-2 mt-2">
            <button onClick={handleGet} className="p-2 w-20 btn btn-accent btn-sm">
              Get
            </button>
          </div>
          <div className="flex flex-nowrap mx-2 mt-2">
            <button onClick={handleExport} className="p-2 w-20 btn btn-accent btn-sm">
              Export
            </button>
          </div>
          <div className="flex flex-nowrap mx-2 mt-2">
            <span className="pt-0 px-2 text-lg font-semibold w-38">Count: {count}</span>
            <span className="pt-0 px-2 text-lg font-semibold w-48">Total Amount: {totalprice}</span>
          </div>
        </div>
      </div>
      <div className="p-1 w-full h-[calc(100vh-190px)]">
        <AgGridReact
          reactUi="true"
          className="ag-theme-alpine"
          animateRows="true"
          modules={modules}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // enableRangeSelection="true"
          rowSelection="single"
          suppressRowClickSelection="true"
          rowData={parkingrecord}
          enableCellTextSelection={true}
          // isExternalFilterPresent={isExternalFilterPresent}
          // doesExternalFilterPass={doesExternalFilterPass}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
      <LoadingIndicator loading={loading} color="#000099" />
    </div>
  );
};

const ParkingType = [
  { label: "Entry Only", value: 1 },
  { label: "Fee Collected", value: 2 },
];
const VehicleClass = [
  { label: "CAR", value: "CAR" },
  { label: "MOTORCYCLE", value: "MOTORCYCLE" },
];

export default withUser(DetailReportPage);
