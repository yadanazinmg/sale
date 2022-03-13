export const FETCH_HCP = "FETCH_HCP";
export const FETCH_HCP_COMPLETED = "FETCH_HCP_COMPLETED";
export const SET_HCP = "SET_HCP";

export const FETCH_HCPS = "FETCH_HCPS";
export const FETCH_HCPS_BY_URL = "FETCH_HCPS_BY_URL";
export const FETCH_HCPS_COMPLETED = "FETCH_HCPS_COMPLETED";
export const SET_HCPS = "SET_HCPS";

export const actionCreators = {
  fetchHCP: (id) => ({
    type: FETCH_HCP,
    id,
  }),
  fetchHCPCompleted: (hcp) => ({
    type: FETCH_HCP_COMPLETED,
    hcp,
  }),
  setHCP: (hcp) => ({
    type: SET_HCP,
    hcp,
  }),

  fetchHCPS: (orgId) => ({
    type: FETCH_HCPS,
    orgId,
  }),

  fetchHCPSCompleted: (hcps) => ({
    type: FETCH_HCPS_COMPLETED,
    hcps,
  }),

  setHCPS: (hcps) => ({
    type: SET_HCPS,
    hcps,
  }),
};
