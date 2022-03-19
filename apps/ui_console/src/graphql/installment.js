import { gql } from "@apollo/client";

export const create_installment = gql`
  mutation CreateInstallmentRecord($data: InstallmentRecordCreateInput!) {
    createInstallmentRecord(data: $data) {
      id
    }
  }
`;

export const delete_installments = gql`
  mutation delete_installments($where: InstallmentRecordWhereInput) {
    deleteManyInstallmentRecord(where: $where) {
      count
    }
  }
`;
