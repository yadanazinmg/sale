import { gql } from "@apollo/client";

export const get_gates = gql`
  query Query($orderBy: [GateOrderByWithRelationInput!]) {
    gates(orderBy: $orderBy) {
      id
      name
      gate_type
      created_at
      updated_at
    }
  }
`;

export const get_gate_by_Id = gql`
  query Gate($where: GateWhereUniqueInput!) {
    gate(where: $where) {
      id
      name
      gate_type
      created_at
      updated_at
    }
  }
`;

export const get_exit_gate = gql`
  query get_exit_gate($where: GateWhereInput) {
    gates(where: $where) {
      id
      name
      gate_type
      active
      created_at
    }
  }
`;

export const create_gate = gql`
  mutation CreateGate($data: GateCreateInput!) {
    createGate(data: $data) {
      id
      name
    }
  }
`;
export const update_gate = gql`
  mutation UpdateGate($data: GateUpdateInput!, $where: GateWhereUniqueInput!) {
    updateGate(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const delete_gate = gql`
  mutation DeleteGate($where: GateWhereUniqueInput!) {
    deleteGate(where: $where) {
      id
      name
    }
  }
`;
