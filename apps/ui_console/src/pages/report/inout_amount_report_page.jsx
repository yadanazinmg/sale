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
import { get_users } from "../../graphql/user";
import { get_sales, get_sale_by_data } from "../../graphql/sale";

// const dateFormatter = (params) => {
//   return moment(params.value).format("DD/MM/YYYY");
// };

const InstallmentReportPage = (props) => {
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
  const [user, setUser] = useState();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGet = () => {
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
              },
            ],
          },
        },
      });
    } else if (vehicleclass === "1") {
      console.log("In parking 1");
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
                  equals: 0,
                },
              },
            ],
          },
        },
      });
    } else {
      console.log("In parking 1");
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
      { headerName: "ဘောင်ချာနံပါတ်", field: "voucher_no", width: 130 },
      { headerName: "နေ့စွဲ", field: "created_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "ဝယ်သူအမည်", field: "customer", width: 130 },
      { headerName: "နေရပ်", field: "address", width: 130 },
      { headerName: "ကြွေးဆပ်", field: "give_amount", width: 100 },
      { headerName: "နောက်ဆုံးကြွေးဆပ်နေ့စွဲ", field: "installment_at", width: 180, valueFormatter: dateFormatter },
      { headerName: "ကြွေးကျန်", field: "total_amount", width: 130 },
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
    DetailsExcelExport(parkingrecord, sdate, edate, vehicleclass);
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
  { label: "ကြွေးကျန်", value: "0" },
  { label: "ကြွေးမကျန်", value: "1" },
];

export default withUser(InstallmentReportPage);
