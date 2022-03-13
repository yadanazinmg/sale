import { gql } from "@apollo/client";

export const create_installment = gql`
  mutation CreateInstallmentRecord($data: InstallmentRecordCreateInput!) {
    createInstallmentRecord(data: $data) {
      id
    }
  }
`;
