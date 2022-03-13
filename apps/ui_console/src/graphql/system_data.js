import { gql } from "@apollo/client";

export const get_system_data = gql`
  query get_system_data {
    findManySystemData {
      id
      code
      value
      description
    }
  }
`;

export const get_system_data_by_id = gql`
  query FindFirstSystemData($where: SystemDataWhereInput) {
    findFirstSystemData(where: $where) {
      id
      code
      description
      value
    }
  }
`;

export const update_system_data = gql`
  mutation update_system_data($data: SystemDataUpdateInput!, $where: SystemDataWhereUniqueInput!) {
    updateSystemData(data: $data, where: $where) {
      id
      code
    }
  }
`;
