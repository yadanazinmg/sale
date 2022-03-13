import { gql } from "@apollo/client";

export const get_parking_fee = gql`
  query get_parking_fee {
    parkingFees {
      id
      from_min
      to_min
      duration
      fee
      vehicle_class
      active
      created_at
      updated_at
    }
  }
`;

export const get_parking_fee_by_Id = gql`
  query get_parking_fee_by_Id($where: ParkingFeeWhereUniqueInput!) {
    parkingFee(where: $where) {
      id
      from_min
      to_min
      duration
      fee
      vehicle_class
      active
      created_at
      updated_at
    }
  }
`;

export const delete_parking_fee = gql`
  mutation delete_parking_fee($where: ParkingFeeWhereUniqueInput!) {
    deleteParkingFee(where: $where) {
      id
    }
  }
`;

export const create_parking_fee = gql`
  mutation create_parking_fee($data: ParkingFeeCreateInput!) {
    createParkingFee(data: $data) {
      id
    }
  }
`;
export const update_parking_fee = gql`
mutation update_parking_fee($data: ParkingFeeUpdateInput!, $where: ParkingFeeWhereUniqueInput!) {
  updateParkingFee(data: $data, where: $where) {
    id
  }
}`
