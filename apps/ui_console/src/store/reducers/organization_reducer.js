import produce from "immer";
import * as Action_Constants from "../actions/organization_actions";

const initialState = null;
export const OrgReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case Action_Constants.SET_ORG: {
      return action.organization;
    }
    case Action_Constants.FETCH_ORG_COMPLETED: {
      console.log(action.organization);
      return action.organization;
    }
    default:
      return state;
  }
});
