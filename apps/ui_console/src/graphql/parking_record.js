import { gql } from "@apollo/client";

export const get_parking_records = gql`
  query get_parking_records {
    parkingRecords {
      id
      vehicle_id
      entry_time
      entry_gate_id
      vehicle_class
      exit_time
      exit_gate_id
      user_id
      collected_amount
      payment_info
      shift_id
      slip_number
      active
      created_at
      updated_at
      entry_gate {
        id
        name
      }
      exit_gate {
        id
        name
      }
    }
  }
`;

export const get_parking_record_by_Time = gql`
  query ParkingRecords($where: ParkingRecordWhereInput) {
    parkingRecords(where: $where) {
      id
      vehicle_id
      vehicle_class
      entry_time
      entry_gate_id
      exit_time
      exit_gate_id
      user_id
      collected_amount
      payment_info
      shift_id
      slip_number
      created_at
      updated_at
      entry_gate {
        id
        name
      }
      exit_gate {
        id
        name
      }
      casher {
        id
        name
      }
      shift {
        id
        name
      }
    }
  }
`;
