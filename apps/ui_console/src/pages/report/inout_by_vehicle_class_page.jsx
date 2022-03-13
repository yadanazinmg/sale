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
import { DetailsExcelExport, VehicleClassExcelExport } from "../../helpers/excel_helper";

// const dateFormatter = (params) => {
//   return moment(params.value).format("DD/MM/YYYY");
// };

const VehicleClassReportPage = (props) => {
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
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGet = () => {
    setParkingRecord([]);
    getTicketRecord({
      variables: {
        where: {
          AND: [
            {
              exit_time: {
                gte: sdate,
                lte: edate,
              },
            },
          ],
        },
      },
    });
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
      { field: "vehicle_class" },
      { field: "count" },
      { field: "amount" },
      // { field: "shift_id" },
      // { field: "collected_amount" },
      // { field: "slip_number" },
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
    VehicleClassExcelExport(parkingrecord, sdate, edate);
  };

  useEffect(async () => {
    setLoading(gqlLoading);
    console.log(ticketrecord);
    if (!gqlLoading && ticketrecord) {
      console.log(ticketrecord.parkingRecords);
      const tmp = ticketrecord.parkingRecords;
      console.log(tmp);
      if (tmp) {
        let i = 0;
        const reducer = (map, d) => {
          let user = d.vehicle_class;
          if (map[user]) {
            let a = map[user];
            a.vehicle_class = user;
            a.count += 1;
            a.amount += d.collected_amount ? d.collected_amount : 0;
            // a[i] = d;
            i++;
          } else {
            map[user] = {
              vehicle_class: user,
              count: 1,
              amount: d.collected_amount ? d.collected_amount : 0,
              // 9000001: d,
            };
          }
          return map;
        };

        const obj = tmp.reduce(reducer, []);
        const result = Object.values(obj);

        let countsum = 0;
        let amountsum = 0;
        for (var j = 0; j < result.length; j++) {
          countsum += result[j].count;
          if (result[j].amount) amountsum += result[j].amount;
        }
        setTotalPrice(amountsum);
        setCount(countsum);
        result.push({
          vehicle_class: "Total",
          count: countsum,
          amount: amountsum,
        });

        console.log(obj);
        console.log(result);
        setParkingRecord(result);
      }
    }
  }, [gqlLoading]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full flex flex-row py-1 place-content-center">
        <span className="text-3xl font-semibold capitalize mb-2">Vehicle Class Report</span>
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
            <span className="pt-0 px-2 text-lg font-semibold w-48">Total Count: {count}</span>
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
          // isExternalFilterPresent={isExternalFilterPresent}
          // doesExternalFilterPass={doesExternalFilterPass}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
      <LoadingIndicator loading={loading} color="#000099" />
    </div>
  );
};

export default withUser(VehicleClassReportPage);
