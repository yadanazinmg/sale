import { gql } from "@apollo/client";

export const get_customers = gql`
  query get_customers {
    customers {
      id
      name
      address
      total_amount
      Phone
      description
      created_at
      updated_at
    }
  }
`;

export const get_customer_by_id = gql`
  query get_customer_by_id($where: CustomerWhereUniqueInput!) {
    customer(where: $where) {
      id
      name
      address
      Phone
      total_amount
      description
      created_at
      updated_at
    }
  }
`;

export const create_customer = gql`
  mutation Mutation($data: CustomerCreateInput!) {
    createCustomer(data: $data) {
      id
      name
    }
  }
`;

export const update_customer = gql`
  mutation update_customer($data: CustomerUpdateInput!, $where: CustomerWhereUniqueInput!) {
    updateCustomer(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const delete_customer = gql`
  mutation delete_customer($where: CustomerWhereUniqueInput!) {
    deleteCustomer(where: $where) {
      id
      name
    }
  }
`;

export const increment_customer_amount = gql`
  mutation increment_customer_amount($data: CustomerUpdateInput!, $where: CustomerWhereUniqueInput!) {
    updateCustomer(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const decresement_customer_amount = gql`
  mutation increment_customer_amount($data: CustomerUpdateInput!, $where: CustomerWhereUniqueInput!) {
    updateCustomer(data: $data, where: $where) {
      id
      name
    }
  }
`;
