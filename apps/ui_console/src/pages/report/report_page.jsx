import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import paths from "../../routes/paths";
import moment from "moment";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { address2string } from "../../helpers/utils";
import LoadingIndicator from "../../components/loading_indicator";
import withUser from "../../hocs/with_user";

const ReportPage = (props) => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const addressGetter = (data) => {
    //const { Line, Township, Town, State, Country } = params.data.Address;
    //return `${Line}, ${Township}, ${Town}, ${State}, ${Country}`;
    return address2string(data);
  };
  const dateFormatter = (date) => {
    return moment(date?.toDate()).format("DD/MM/YYYY");
  };
  const handleDetialReport = () => {
    console.log("Detail");
    navigate(paths.inout_detail_report);
  };
  const handleAmountReport = () => {
    navigate(paths.inout_amount_report);
  };
  const handleOperatorReport = () => {
    navigate(paths.inout_operator_report);
  };
  const handleShiftReport = () => {
    navigate(paths.inout_shift_report);
  };
  const handleVehicleClassReport = () => {
    navigate(paths.vehicle_class_report);
  };
  const handleHourClassReport = () => {
    navigate(paths.inout_hour_report);
  };

  return (
    <div className="w-full flex flex-row place-content-center ">
      <div className="flex flex-col place-content-center max-w-[1024px]">
        <div className="w-full text-center text-3xl font-semibold">Reports</div>
        <div className="flex flex-wrap p-2 mt-4 place-content-center w-full">
          <div>
            <button onClick={handleDetialReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Sale Detail Report
            </button>
          </div>
          <div>
            <button onClick={handleAmountReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Installment Report
            </button>
          </div>
          {/* <div>
            <button onClick={handleOperatorReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Parking Records by Gate Operators
            </button>
          </div>
          <div>
            <button onClick={handleShiftReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Parking Records by Shifts
            </button>
          </div>
          <div>
            <button onClick={handleVehicleClassReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Parking Records by VehicleClass
            </button>
          </div>
          <div>
            <button onClick={handleHourClassReport} className="m-4 p-2 h-20 w-48 btn btn-primary">
              Parking Records by Hour
            </button>
          </div> */}
          <LoadingIndicator loading={loading} color="#000099" />
        </div>
      </div>
    </div>
  );
};

export default withUser(ReportPage);
