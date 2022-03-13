import { gql } from "@apollo/client";

export const get_sales = gql`
  query get_sales {
    saleRecords {
      id
      voucher_no
      customer
      address
      give_amount
      total_amount
      net_amount
      shop_id
      product_status
      user_id
      user_name
      created_at
      updated_at
      installment_at
      _count {
        installment_records
      }
      shop {
        id
        name
      }
      user {
        id
        name
      }
      installment_records {
        id
        customer_id
      }
    }
  }
`;

export const delete_sale = gql`
  mutation Mutation($where: SaleRecordWhereUniqueInput!) {
    deleteSaleRecord(where: $where) {
      id
      voucher_no
      customer
    }
  }
`;

export const create_sale = gql`
  mutation create_sale($data: SaleRecordCreateInput!) {
    createSaleRecord(data: $data) {
      id
      voucher_no
      customer
    }
  }
`;
