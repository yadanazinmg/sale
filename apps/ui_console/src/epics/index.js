import { combineEpics } from "redux-observable";
// import { fetchOrganizationEpic, fetchOrganizationByUrlEpic } from "./organization_epics";
// import { fetchHCPByUrlEpic } from "./hcp_epics";

// const rootEpic = combineEpics(fetchOrganizationEpic, fetchOrganizationByUrlEpic, fetchHCPByUrlEpic);
const rootEpic = combineEpics();
export default rootEpic;
