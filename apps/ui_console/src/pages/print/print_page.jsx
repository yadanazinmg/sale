import React, { lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import withUser from "../../hocs/with_user";
import paths from "../../routes/paths";
import VaccinationRecord from "../../components/vaccination_record";

const ECertPage = (props) => {
  const { org } = props;
  const navigate = useNavigate();
  const Print = lazy(() => import(`./pid/print_page.jsx`));
  const { id } = useParams();
  const handlePrint = () => {
    window.print();
    // setHide("");
  };

  const handleBack = () => {
    navigate(paths.sale);
  };

  console.log(id);
  return (
    <div className="my-3">
      <Suspense fallback={<div>Loading...</div>}>
        <Print />
      </Suspense>
      <button onClick={handleBack} className="hideonprint m-4 underline w-20">
        Back
      </button>
      <button onClick={handlePrint} className="hideonprint m-4 underline w-20">
        Print
      </button>
    </div>
  );
};

export default withUser(ECertPage);
