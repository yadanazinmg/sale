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
import { DetailsExcelExport, ExcelExport } from "../../helpers/excel_helper";
import { get_exit_gate } from "../../graphql/gate";
import { get_users } from "../../graphql/user";
import { get_sales, get_sale_by_data } from "../../graphql/sale";

// const dateFormatter = (params) => {
//   return moment(params.value).format("DD/MM/YYYY");
// };

const DetailReportPage = (props) => {
  const {
    loading: gloading,
    error,
    data: users,
    refetch,
  } = useQuery(get_users, {
    pollInterval: 0,
    fetchPolicy: "network-only",
  });

  const [getTicketRecord, { loading: gqlLoading, data: ticketrecord }] = useLazyQuery(get_sale_by_data, {
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
  const [selectuser, setSelectUser] = useState();
  const [selectctype, setCtype] = useState();
  const [user, setUser] = useState();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGet = () => {
    var itg = 0;
    if (selectctype) {
      itg = parseInt(selectctype);
    }
    console.log(itg);
    setParkingRecord([]);
    if (vehicleclass === "0") {
      console.log("In parking 2");
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                created_at: {
                  gte: sdate,
                  lte: edate,
                },
                user_id: {
                  equals: selectuser,
                },
                total_amount: {
                  gt: 0,
                },
                customer: {
                  equals: vehicleid,
                },
                customer_type: {
                  equals: itg,
                },
              },
            ],
          },
        },
      });
    } else if (vehicleclass === "1") {
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                created_at: {
                  gte: sdate,
                  lte: edate,
                },
                customer: {
                  equals: vehicleid,
                },
                user_id: {
                  equals: selectuser,
                },
                total_amount: {
                  equals: 0,
                },
                customer_type: {
                  equals: itg,
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
            AND: [
              {
                sale_date: {
                  gte: sdate,
                  lte: edate,
                },
                user_id: {
                  equals: selectuser,
                },
                customer_type: {
                  equals: itg,
                },
                customer: {
                  equals: vehicleid,
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

  const getPriceFormat = (params) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    let dl = dollarUSLocale.format(params.data.total_amount);
    console.log(dl);
    return dl;
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      { headerName: "??????????????????????????????????????????", field: "voucher_no", width: 130 },
      { headerName: "??????????????????", field: "created_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "???????????????????????????", field: "customer", width: 130 },
      { headerName: "???????????????", field: "address", width: 130 },
      { headerName: "Phone", field: "phone", width: 130 },
      { headerName: "????????????????????????", field: "give_amount", width: 100 },
      { headerName: "?????????????????????????????????????????????????????????????????????", field: "installment_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "???????????????????????????", field: "total_amount", width: 130, valueFormatter: getPriceFormat },
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
    console.log(count);
    console.log(totalprice);
    ExcelExport(parkingrecord, sdate, edate, count, totalprice);
  };

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(ticketrecord);
    if (!gqlLoading && ticketrecord) {
      console.log(ticketrecord.saleRecords);
      setParkingRecord(ticketrecord.saleRecords);
      setCount(ticketrecord.saleRecords.length);
      const tmp = ticketrecord.saleRecords;
      console.log(tmp);
      let total = tmp.reduce((a, c) => a + c.total_amount, 0);
      console.log(total);
      setTotalPrice(total);
    }
  }, [gqlLoading]);

  useEffect(async () => {
    setLoading(gloading);
    console.log(users);
    if (!gqlLoading && users) {
      console.log(users.users);
      setUser(users.users);
    }
  }, [gloading]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row py-1 place-content-center">
        <span className="text-3xl font-semibold capitalize mb-2">Sale Report</span>
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
              timeFormat="HH:mm"
              onChange={(date) => setsDate(date)}
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
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
              timeFormat="HH:mm"
              onChange={(date) => seteDate(date)}
              autoComplete="off"
              dateFormat="dd/MM/yyyy"
              className="input input-primary input-sm w-36"
            />
          </div>
          <div className="flex flex-nowrap mt-2">
            <select id="vehicle_class" className="select select-primary select-sm" onChange={(e) => SetVehicleClass(e.target.value)}>
              <option value="">All</option>
              {VehicleClass.map((r) => (
                <option value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-nowrap mt-2">
            <select id="vehicle_class" className="select select-primary select-sm" onChange={(e) => setSelectUser(e.target.value)}>
              <option value="">All</option>
              {user && user.map((r) => <option value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="flex flex-nowrap mt-2">
            <select id="vehicle_class" className="select select-primary select-sm" onChange={(e) => setCtype(e.target.value)}>
              <option value="">All</option>
              {CustomerType.map((r) => (
                <option value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-nowrap mt-2">
            <input className="input input-primary input-sm w-48" type="text" placeholder="Customer Name" onChange={handleVehicleId} />
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
            <span className="pt-0 px-2 text-lg font-semibold w-auto">Count: {count}</span>
            <span className="pt-0 px-2 text-lg font-semibold w-auto">Total Amount: {totalprice}</span>
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

const VehicleClass = [
  { label: "???????????????????????????", value: "0" },
  { label: "??????????????????????????????", value: "1" },
];

const CustomerType = [
  { label: "Special Sale", value: 1 },
  { label: "Normal Sale", value: 0 },
];

export default withUser(DetailReportPage);
