import React, { useState, useEffect } from "react";
//import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import SideMenu from "./components/main_menu";
import AppRoutes from "./routes";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "./assets/icons/svg_icons";
import { AuthProvider, useAuth } from "./auth/auth_provider";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import withUser from "./hocs/with_user";
import paths from "./routes/paths";

function App(props) {
  const [sideBarFull, setSideBarFull] = useState(true);
  const location = useLocation();
  // let auth = useAuth();
  // auth.initialize();

  // useEffect(() => {
  //   auth.initialize();
  // }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSideBarFull(!state);
  };

  const handleMenuNarrowClick = (e) => {
    setSideBarFull(!sideBarFull);
  };

  //console.log(location);

  const IsNormalPage = () => {
    console.log(location);
    const blankPages = [paths.login];

    console.log(blankPages);

    for (let i = 0; i < blankPages.length; i++) {
      console.log(location);
      console.log(paths.login);
      if (location.pathname.startsWith(blankPages[i])) return false;

      //if (location.state?.from?.startsWith(blankPages[i])) return false;
    }
    return true;
  };

  //console.log(IsNormalPage());

  const PageHeader = () => {
    return (
      <div className="h-[72px] p-1 w-full flex flex-row bg-gray-300 items-center align-middle justify-center border-b-[1px] border-gray-500">
        <div
          className="w-auto items-center p-1 rounded-full bg-gray-100 hover:bg-gray-400 cursor-pointer transition-all duration-1000 ease-in-out"
          onClick={handleMenuNarrowClick}
        >
          {sideBarFull ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
        </div>
        <div className="w-full text-center">
          <Header />
        </div>
      </div>
    );
  };

  return (
    <AuthProvider user={props.user}>
      <div className="relative w-full min-w-[480px]">
        <div className="flex flex-row">
          <div className="w-auto z-0">{IsNormalPage() && <SideMenu showFullMenu={sideBarFull} />}</div>
          <div className="w-full h-full flex flex-col z-10 bg-gray-100">
            {IsNormalPage() && <PageHeader />}
            <AppRoutes />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default withUser(App);
