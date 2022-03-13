const paths = {
  home: "/",
  user: "/user",
  dose: "/dose",

  user_create: "/user_create",
  user_edit: "/user_edit/:id",
  getUserEdit: (id) => `/user_edit/${id}`,
  user_update_password: "/user_update_password/:id",
  getUserUpdatePassword: (id) => `/user_update_password/${id}`,

  report: "/report",
  login: "/login",

  admin_reset_pwd: "/admin_reset_pwd",
  admin_gen_qr: "/admin_gen_qr",
  admin_sp_func: "/admin_sp_func",

  pin: "/pin",
  defaultpin: "/defaultpin",
  newpin: "/newpin",

  gate: "/gate",
  gate_create: "/gate_create",
  gate_edit: "/gate_edit/:id",
  getGateEdit: (id) => `/gate_edit/${id}`,

  parking_fee: "/parking_fee",
  parking_fee_create: "/parking_fee_create",
  parking_fee_edit: "/parking_fee_edit/:id",
  getParkingFeeEdit: (id) => `/parking_fee_edit/${id}`,

  redemption: "/redemption",
  redemption_create: "/redemption_create",
  redemption_edit: "/redemption_edit/:id",
  getRedemptionEdit: (id) => `/Redemption_edit/${id}`,

  redemption_type: "/redemption_type",
  redemption_type_create: "/redemption_type_create",
  redemption_type_edit: "/redemption_type_edit/:id",
  getRedemptionTypeEdit: (id) => `/redemption_type_edit/${id}`,

  shift: "/shift",
  shift_create: "/shift_create",
  shift_edit: "/shift_edit/:id",
  getShiftEdit: (id) => `/shift_edit/${id}`,

  inout_detail_report: "/inout_detail_report",
  inout_operator_report: "/inout_operator_report",
  inout_shift_report: "/inout_shift_report",
  inout_amount_report: "/inout_amount_report",
  vehicle_class_report: "/vehicle_class_report",
  inout_hour_report: "/inout_hour_report",
  inout_duration_report: "/inout_duration_report",

  parking_slot: "/parking_slot",
  parking_slot_edit: "/parking_slot/:id",
  getParkingSlotEdit: (id) => `/parking_slot/${id}`,

  sale: "/sale",
  sale_create: "/sale_create",
  sale_edit: "/sale_edit/:id",
  getSaleEdit: (id) => `/sale_edit/${id}`,

  installment: "/installment",
  installment_create: "/installment_create/:id",
  installment_edit: "/installment_edit/:id",
  getInstallmentEdit: (id) => `/installment_edit/${id}`,
};

export default paths;
