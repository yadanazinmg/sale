import React, { useEffect, useState } from "react";
import VaccinationRecordTable from "./vaccination_record_table";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { get_system_data } from "../graphql/system_data";

const VaccinationRecord = (props) => {
  const {
    loading: qLoading,
    data: gates,
    refetch,
  } = useQuery(get_system_data, {
    pollInterval: 0,
    fetchPolicy: "no-cache",
    variables: {
      where: {
        code: {
          equals: "ThankYouCode",
        },
      },
    },
  });
  const [thank, setThank] = useState();
  let [loading, setLoading] = useState(true);
  const { id } = props;
  useEffect(async () => {
    setLoading(qLoading);
    console.log(gates);
    if (!qLoading && gates) {
      let sd = gates.findManySystemData;
      let result = sd.filter((e) => e.code == "ThankYouCode");
      setThank(result[0].value);
      console.log("before sd");
      console.log(result);
    }
  }, [qLoading]);

  return (
    <div>
      {/* <div className="pl-2 pb-2">
        <PatientInfo id={id} />
      </div> */}
      <VaccinationRecordTable id={id} />
      <p className="text-center text-lg mt-24">{thank}</p>
    </div>
  );
};

export default VaccinationRecord;
