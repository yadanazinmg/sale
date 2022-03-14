import React from "react";
import VaccinationRecordTable from "./vaccination_record_table";

const VaccinationRecord = (props) => {
  const { id } = props;
  return (
    <div>
      {/* <div className="pl-2 pb-2">
        <PatientInfo id={id} />
      </div> */}
      <VaccinationRecordTable id={id} />
    </div>
  );
};

export default VaccinationRecord;
