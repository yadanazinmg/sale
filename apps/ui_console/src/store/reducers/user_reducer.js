import produce from "immer";
import * as Action_Constants from "../actions/user_actions";

const initialState = null;

export const UserReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case Action_Constants.SET_USER: {
      return action.user;
    }
    case Action_Constants.FETCH_USER_COMPLETED: {
      return action.user;
    }
    default:
      return state;
  }
});
