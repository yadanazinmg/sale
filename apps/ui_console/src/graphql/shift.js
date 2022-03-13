import { gql } from "@apollo/client";

export const get_shifts = gql`
  query get_shifts {
    shifts {
      id
      name
      from_hour
      from_min
      to_hour
      to_min
      active
      created_at
      updated_at
      _count {
        parking_records
      }
    }
  }
`;

export const get_shift_by_Id = gql`
  query get_shift_by_Id($where: ShiftWhereUniqueInput!) {
    shift(where: $where) {
      id
      name
      from_hour
      from_min
      to_hour
      to_min
      active
      created_at
      updated_at
      _count {
        parking_records
      }
    }
  }
`;

export const create_shift = gql`
  mutation create_shift($data: ShiftCreateInput!) {
    createShift(data: $data) {
      id
      name
    }
  }
`;

export const update_shift = gql`
  mutation update_shift($data: ShiftUpdateInput!, $where: ShiftWhereUniqueInput!) {
    updateShift(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const delete_shift = gql`
  mutation delete_shift($where: ShiftWhereUniqueInput!) {
    deleteShift(where: $where) {
      id
      name
    }
  }
`;
