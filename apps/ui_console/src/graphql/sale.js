import { gql } from "@apollo/client";

export const get_sales = gql`
  query SaleRecords($where: SaleRecordWhereInput) {
    saleRecords(where: $where) {
      id
      voucher_no
      customer
      customer_id
      address
      give_amount
      total_amount
      net_amount
      shop_id
      product_status
      user_id
      user_name
      particular
      metadata
      phone
      referral
      referral_phone
      qty
      father_name
      created_at
      updated_at
      installment_at
      customer_type
      price
      sale_date
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

export const get_sale_by_id = gql`
  query get_sale_by_id($where: SaleRecordWhereUniqueInput!) {
    saleRecord(where: $where) {
      id
      voucher_no
      customer
      customer_id
      address
      give_amount
      total_amount
      net_amount
      particular
      qty
      father_name
      shop_id
      phone
      referral
      referral_phone
      product_status
      installment_at
      user_id
      user_name
      created_at
      updated_at
      customer_type
      metadata
      price
      sale_date
    }
  }
`;

export const delete_sale = gql`
  mutation delete_sale($where: SaleRecordWhereUniqueInput!) {
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

export const update_sale = gql`
  mutation UpdateSaleRecord($data: SaleRecordUpdateInput!, $where: SaleRecordWhereUniqueInput!) {
    updateSaleRecord(data: $data, where: $where) {
      id
      voucher_no
      customer
    }
  }
`;

export const get_sale_by_data = gql`
  query get_sale_by_data($where: SaleRecordWhereInput) {
    saleRecords(where: $where) {
      id
      voucher_no
      customer
      customer_id
      address
      give_amount
      total_amount
      net_amount
      particular
      qty
      shop_id
      product_status
      user_id
      user_name
      metadata
      installment_amount
      created_at
      updated_at
      installment_at
      phone
      father_name
      referral
      referral_phone
      customer_type
      price
      sale_date
      _count {
        installment_records
      }
    }
  }
`;
