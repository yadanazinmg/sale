import { getDocument, getDocuments } from "./rx_utils";

export const getOrganization = (id) => {
  return getDocument("/organizations", id);
};

// export const getOrganizationByUrl = (url) => {
//   return getDocument("/organizations", id);
// };

export const getUser = (orgId, id) => {
  return getDocument(`/organizations/${orgId}/users`, id);
};

export const getHCPs = (orgId) => {
  return getDocuments(`/organizations/${orgId}/healthcare_professionals`);
};
