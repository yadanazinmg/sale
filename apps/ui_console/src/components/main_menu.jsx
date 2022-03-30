import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GateIcon,
  HCP,
  HomeIcon,
  LogoutIcon,
  MoneyAddIcon,
  MoneyIcon,
  Patient,
  RedemptionIcon,
  RedemptionTypeIcon,
  ReferralIcon,
  Report,
  SalePerson,
  ShiftIcon,
  SlotLimitIcon,
  SpecialSaleIcon,
  User,
  Vaccine2,
} from "../assets/icons/svg_icons";
import { useAuth } from "../auth/auth_provider";
import paths from "../routes/paths";

const menuData = [
  {
    name: "Home",
    link: paths.home,
    icon: HomeIcon,
    roles: ["ADMIN"],
  },
  {
    name: "User",
    link: paths.user,
    icon: User,
    roles: ["ADMIN"],
  },
  {
    name: "Installment",
    link: paths.installment,
    icon: MoneyAddIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Special Sale",
    link: paths.special_sale,
    icon: SpecialSaleIcon,
    roles: ["ADMIN"],
  },
  {
    name: "Sale",
    link: paths.sale,
    icon: SalePerson,
    roles: ["ADMIN"],
  },
  {
    name: "Report",
    link: paths.report,
    icon: Report,
    roles: ["ADMIN"],
  },
];

const MainMenu = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const filterByRole = (menu) => {
    console.log(auth.user);
    if (auth.user) {
      const role = auth.user.role;
      const filteredMenu = menu.filter((m) => {
        return m.roles.indexOf(role) > -1;
      });
      return filteredMenu;
    }
    return menu;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    auth.signOut();
    navigate(paths.home, { replace: true });
  };

  return (
    <div>
      <ul className="menu flex flex-col p-4 pt-2 compact">
        {/* <li className="mt-4 menu-title">
          <span>Actions</span>
        </li> */}
        {filterByRole(menuData).map((m) => (
          <li key={m.name}>
            <Link to={m.link} className="capitalize my-1">
              <div className="ml-1 mr-4 w-8">
                <m.icon />
              </div>
              {m.name}
            </Link>
          </li>
        ))}
        <li key="logout">
          <a href="#" className="capitalize my-1" onClick={handleLogout}>
            <div className="pl-2 mr-4 w-8">
              <LogoutIcon />
            </div>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
