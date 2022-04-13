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

const SpecialCustomerReportPage = (props) => {
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
    const startdate = moment();
    const enddate = moment();
    setParkingRecord([]);
    if (vehicleclass === "1") {
      console.log("In parking 2");
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                customer_type: {
                  equals: 1,
                },
                total_amount: {
                  equals: 0,
                },
              },
            ],
          },
        },
      });
    } else if (vehicleclass === "0") {
      console.log("In parking 1");
      getTicketRecord({
        variables: {
          where: {
            AND: [
              {
                customer_type: {
                  equals: 1,
                },
                total_amount: {
                  gt: 0,
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
                customer_type: {
                  equals: 1,
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
    let dl = dollarUSLocale.format(params.data.amount);
    console.log(dl);
    return dl;
  };

  const modules = useMemo(() => [ClientSideRowModelModule], []);

  const columnDefs = useMemo(
    () => [
      { headerName: "ဝယ်သူအမည်", field: "name", width: 130 },
      { headerName: "နေရပ်", field: "address", width: 130 },
      { headerName: "Phone", field: "phone", width: 100 },
      { headerName: "ကြွေးကျန်", field: "amount", width: 130, valueFormatter: getPriceFormat },
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
    DetailsExcelExport(parkingrecord, count, totalprice);
  };

  useEffect(async () => {
    setLoading(gqlLoading);
    if (!gqlLoading && ticketrecord) {
      console.log(ticketrecord.saleRecords);
      const tmp = ticketrecord.saleRecords;
      console.log(tmp);
      let total = tmp.reduce((a, c) => a + c.total_amount, 0);

      let i = 0;
      const reducer = (map, d) => {
        console.log(d);
        let user = d.customer_id;
        console.log(user);
        if (map[user]) {
          let a = map[user];
          a.cid = user;
          a.count += 1;
          a.name = d.customer;
          a.address = d.address;
          a.phone = d.phone;
          a.amount += d.total_amount ? d.total_amount : 0;
          // a[i] = d;
          i++;
        } else {
          map[user] = {
            cid: user,
            name: d.customer,
            count: 1,
            address: d.address,
            phone: d.phone,
            amount: d.total_amount ? d.total_amount : 0,
            // 9000001: d,
          };
        }
        return map;
      };
      const obj = tmp.reduce(reducer, []);
      const result = Object.values(obj);
      console.log(result);

      setTotalPrice(total);
      setParkingRecord(result);
      setCount(result.length);
    }
  }, [gqlLoading]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row py-1 place-content-center">
        <span className="text-3xl font-semibold capitalize mb-2">Special Customer Report</span>
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

export default withUser(SpecialCustomerReportPage);
