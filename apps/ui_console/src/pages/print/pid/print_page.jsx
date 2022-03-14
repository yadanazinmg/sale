import React, { useState } from "react";
import { useParams } from "react-router-dom";
import withUser from "../../../hocs/with_user";
import VaccinationRecord from "../../../components/vaccination_record";

const PrintPage = (props) => {
  const { org } = props;
  const { id } = useParams();
  const [isPrinting, setIsPrinting] = useState(false);
  return (
    <div className="ml-3">
      <div className="relative flex flex-col p-3 w-[1000px] bg-transparent border-[1px] border-gray-300 rounded-md justify-content">
        <VaccinationRecord id={id} />
      </div>
    </div>
  );
};

export default withUser(PrintPage);
