import React from "react";
import { useAuth } from "../auth/auth_provider";
import AppRoutes from "../routes";
import AppName from "./app_name";
import AppVersion from "./app_version";
import MainMenu from "./main_menu";

const FullLayout = () => {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <div className="drawer drawer-mobile h-[calc(100vh-20px)]">
        <input id="main-menu" type="checkbox" className="drawer-toggle" />
        <main className="flex-grow block overflow-x-hidden bg-base-100 text-base-content drawer-content">
          <div
            id="nav"
            className="inset-x-0 top-0 z-50 w-full transition duration-200 ease-in-out border-b border-base-200 bg-base-100 text-base-content sticky"
          >
            <div className="mx-auto space-x-1 navbar max-w-none bg-base-200 border-b-[1px] border-base-300">
              <div className="flex-none">
                <label htmlFor="main-menu" className="btn btn-square btn-ghost drawer-button lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              </div>
              <AppName className="lg:hidden" />
              <AppVersion className="lg:hidden" prefix="v" />
              <div className="flex-1 flex place-content-center">
                <span className="text-3xl font-bold hidden lg:flex"></span>
              </div>

              <div title="User" className="items-center  flex-none py-4">
                {/* <span className="text-primary"> {auth.user?.name}</span> */}
              </div>
            </div>
          </div>
          <AppRoutes />
        </main>
        <div className="drawer-side">
          <label htmlFor="main-menu" className="drawer-overlay"></label>
          <aside className="flex flex-col justify-start border-r border-base-200 bg-base-100 text-base-content w-56">
            <div className="sticky inset-x-0 top-0 z-50 hidden w-full py-1 transition duration-200 ease-in-out border-b lg:block border-base-200 bg-base-300">
              <div className="mx-auto space-x-1 py-1 max-w-none flex flex-col items-center relative">
                <AppName />
                <div className="absolute right-1 -bottom-1">
                  <AppVersion className="" prefix="version" />
                </div>
              </div>
            </div>
            <MainMenu />
          </aside>
        </div>
      </div>
      <footer className="p-[2px] footer bg-base-200 text-base-content footer-center">
        <div>
          <p className="lg:pl-56 text-xs font-thin text-gray-800">Copyright © 2022 - All rights reserved by Intellivale Ltd</p>
        </div>
      </footer>
    </>
  );
};

export default FullLayout;
