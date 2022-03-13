import { gql } from "@apollo/client";

export const get_redemptions = gql`
  query get_redemptions {
    redemptions {
      id
      vehicle_id
      from_hour
      from_min
      to_hour
      to_min
      redemption_type_id
      active
      created_at
      updated_at
      redemption_type {
        id
        name
      }
    }
  }
`;

export const get_redemption_by_id = gql`
  query get_redemption_by_id($where: RedemptionWhereUniqueInput!) {
    redemption(where: $where) {
      id
      vehicle_id
      from_hour
      from_min
      to_hour
      to_min
      redemption_type_id
      active
      created_at
      updated_at
      redemption_type {
        id
        name
      }
    }
  }
`;

export const create_redemption = gql`
  mutation create_redemption($data: RedemptionCreateInput!) {
    createRedemption(data: $data) {
      id
      vehicle_id
    }
  }
`;

export const update_redemption = gql`
  mutation update_redemption($data: RedemptionUpdateInput!, $where: RedemptionWhereUniqueInput!) {
    updateRedemption(data: $data, where: $where) {
      id
      vehicle_id
    }
  }
`;

export const delete_redemption = gql`
  mutation delete_redemption($where: RedemptionWhereUniqueInput!) {
    deleteRedemption(where: $where) {
      id
      vehicle_id
    }
  }
`;
