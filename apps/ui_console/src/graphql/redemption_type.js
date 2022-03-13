import { gql } from "@apollo/client";

export const get_redemption_types = gql`
  query get_redemption_types {
    redemptionTypes {
      id
      name
      discount_minute
      active
      created_at
      updated_at
      _count {
        redemptions
      }
    }
  }
`;

export const get_redemption_type_by_Id = gql`
  query get_redemption_type_by_Id($where: RedemptionTypeWhereUniqueInput!) {
    redemptionType(where: $where) {
      id
      name
      discount_minute
      active
      created_at
      updated_at
      _count {
        redemptions
      }
    }
  }
`;

export const create_redemption_type = gql`
  mutation create_redemption_type($data: RedemptionTypeCreateInput!) {
    createRedemptionType(data: $data) {
      id
      name
    }
  }
`;

export const update_redemption_type = gql`
  mutation update_redemption_type($data: RedemptionTypeUpdateInput!, $where: RedemptionTypeWhereUniqueInput!) {
    updateRedemptionType(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const delete_redemption_type = gql`
  mutation delete_redemption_type($where: RedemptionTypeWhereUniqueInput!) {
    deleteRedemptionType(where: $where) {
      id
      name
    }
  }
`;
