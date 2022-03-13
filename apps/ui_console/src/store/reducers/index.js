import { combineReducers } from "redux";
import { OrgReducer } from "./organization_reducer";
import { UserReducer } from "./user_reducer";
import { HCPReducer } from "./hcp_reducer";

export default combineReducers({
  Organization: OrgReducer,
  User: UserReducer,
  HCPS: HCPReducer,
});
