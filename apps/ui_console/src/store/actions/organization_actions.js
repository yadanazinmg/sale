export const FETCH_ORG = "FETCH_ORG";
export const FETCH_ORG_BY_URL = "FETCH_ORG_BY_URL";
export const FETCH_ORG_COMPLETED = "FETCH_ORG_COMPLETED";

export const SET_ORG = "SET_ORG";

export const actionCreators = {
  fetchOrg: (id) => ({
    type: FETCH_ORG,
    id,
  }),

  fetchOrgByUrl: (url) => ({
    type: FETCH_ORG_BY_URL,
    url,
  }),

  fetchOrgCompleted: (organization) => ({
    type: FETCH_ORG_COMPLETED,
    organization,
  }),

  setOrg: (organization) => ({
    type: SET_ORG,
    organization,
  }),
};
