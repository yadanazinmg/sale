import produce from "immer";
import * as Action_Constants from "../actions/hcp_actions";

const INITIAL_STATE = [];

export const HCPReducer = produce((draft = INITIAL_STATE, action) => {
  switch (action.type) {
    case Action_Constants.SET_HCPS: {
      const hcps = {};
      action.hcps.forEach((h) => {
        hcps[h.id] = h;
      });
      return hcps;
    }
    case Action_Constants.FETCH_HCPS_COMPLETED: {
      const hcps = {};
      console.log(action);
      action.hcps.forEach((h) => {
        hcps[h.id] = h;
      });
      return hcps;
    }
    case Action_Constants.SET_HCP: {
      draft[h.id] = h;
      return draft;
    }
    case Action_Constants.FETCH_HCP_COMPLETED: {
      draft[h.id] = h;
      return draft;
    }
    default:
      return draft;
  }
});
