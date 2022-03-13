import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import paths from "../routes/paths";
import { useLocation, useParams } from "react-router-dom";
import withOrg from "../hocs/with_org";
import { hasPin } from "../helpers/firestore_helpers";

const PinProtectedPage = (props) => {
  const [hasPIN, setHasPIN] = useState(false);
  const [ready, setReady] = useState(false);
  const { org, page: Page } = props;
  const { id } = useParams();
  let location = useLocation();

  useEffect(async () => {
    console.log(props.org);
    try {
      if (props.org.Features.PinProtectedECert === true) {
        const tmp = await hasPin(org.id, id);
        setHasPIN(tmp);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setReady(true);
    }
  }, [props.org]);

  if (ready) {
    if (props.org.Features.PinProtectedECert === true) {
      if (hasPIN) {
        if (location.state?.pinVerified !== true) {
          return <Navigate to={paths.pin} state={{ from: location, org, id }} />;
        } else {
          return <Page />;
        }
      } else {
        return <Navigate to={paths.defaultpin} state={{ from: location, org, id }} />;
      }
    } else {
      return <Page />;
    }
  } else {
    return <span className="p-3">Loading ...</span>;
  }
};
export default withOrg(PinProtectedPage);
