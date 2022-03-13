export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_COMPLETED = "FETCH_USER_COMPLETED";

export const SET_USER = "SET_USER";

export const actionCreators = {
  fetchUser: (id) => ({
    type: FETCH_USER,
    id,
  }),

  fetchUserCompleted: (user) => ({
    type: FETCH_USER_COMPLETED,
    user,
  }),

  setUser: (user) => ({
    type: SET_USER,
    user,
  }),
};
