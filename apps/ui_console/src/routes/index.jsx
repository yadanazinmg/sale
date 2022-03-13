import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import paths from "./paths";

import HomePage from "../pages/home/home_page";

import UserPage from "../pages/user/user_page";
import CreateUserPage from "../pages/user/create_user_page";
import EditUserPage from "../pages/user/edit_user_page";
// import UpdateUserPasswordPage from "../pages/user/update_user_password_page";

import ReportPage from "../pages/report/report_page";
import LoginPage from "../pages/login/login_page";

import ProtectedPage from "./protected_page";
// import ResetPwd from "../pages/admin/reset_pwd";
// import SpecialFunctions from "../pages/admin/special_functions";

import NotFound from "../pages/not_found";
import SalePage from "../pages/sale_entry/sale_page";
import CreateSalePage from "../pages/sale_entry/new_sale_page";
import EditSalePage from "../pages/sale_entry/edit_sale_page";
export const AppRoutes = (props) => {
  return (
    <div>
      <Routes>
        <Route path={paths.home} element={<ProtectedPage page={HomePage} />} />
        <Route path={paths.user} element={<ProtectedPage page={UserPage} />} />
        <Route path={paths.user_create} element={<ProtectedPage page={CreateUserPage} />} />
        <Route path={paths.user_edit} element={<ProtectedPage page={EditUserPage} />} />
        {/* <Route path={paths.user_update_password} element={<ProtectedPage page={UpdateUserPasswordPage} />} /> */}
        <Route path={paths.report} element={<ProtectedPage page={ReportPage} />} />
        <Route path={paths.login} element={<LoginPage />} />

        {/* <Route path={paths.admin_reset_pwd} element={<ResetPwd />} /> */}
        {/* <Route path={paths.admin_gen_qr} element={<GenerateQRCard />} />
        <Route path={paths.admin_sp_func} element={<SpecialFunctions />} /> */}
        {/* <Route path={paths.parking_slot} element={<ProtectedPage page={ParkingSlotPage} />} />
        <Route path={paths.parking_slot_edit} element={<ProtectedPage page={EditParkingSlotPage} />} /> */}

        <Route path={paths.sale} element={<ProtectedPage page={SalePage} />} />
        <Route path={paths.sale_create} element={<ProtectedPage page={CreateSalePage} />} />
        <Route path={paths.sale_edit} element={<ProtectedPage page={EditSalePage} />} />
        <Route component={NotFound} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
