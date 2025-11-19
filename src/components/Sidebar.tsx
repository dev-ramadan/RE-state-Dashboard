import {
  HomeIcon,
  User,
  LogOut,
  User2,
  UserCircle2,
  HouseHeartIcon,
  ChartColumnIcon,
  X,
  Home,
} from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router";
import { OureContext } from "../context/globale";

const Sidebar = () => {
  const context = useContext(OureContext);
  if (!context) throw new Error("Sidebar must be used within OureProvider");

  const { openSidebare, setOpenSidebare } = context;

  const menuItems = [
    { icon: HomeIcon, title: "Dashboard", link: "/" },
    { icon: User2, title: "Users", link: "/customer" },
    { icon: UserCircle2, title: "Agent", link: "/agent" },
    { icon: User, title: "Broker", link: "/broker" },
    { icon: HouseHeartIcon, title: "Property", link: "/property" },
    { icon: ChartColumnIcon, title: "Analytics", link: "/analytics" },
  ];

  const handleCloseSidebar = () => setOpenSidebare(false);

  return (
    <div
      className={`absolute top-0 left-0 h-screen bg-gray-900 text-white 
        flex flex-col transition-all duration-300 overflow-hidden shadow-xl
        ${openSidebare ? "w-44 md:w-64 z-50" : "w-0 -z-20"}
      `}
    >
      {openSidebare && (
        <div className="p-5 text-xl font-extrabold tracking-wide select-none flex justify-between items-center">
          <span className="flex items-center gap-1 text-lg md:text-2xl"><Home/> ESTATE </span> <span onClick={handleCloseSidebar} className="cursor-pointer"><X/></span>
        </div>
      )}

      <ul className="flex-1 mt-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.link}
              onClick={handleCloseSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 rounded-md transition-colors
                ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}
              `
              }
            >
              <Icon size={22} />

              {openSidebare && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}

        {/* ==== Sign Out ==== */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setOpenSidebare(false);
          }}
          className="flex items-center gap-3 px-5 py-3 mt-2 hover:bg-red-600 transition-colors text-left"
        >
          <LogOut size={22} />
          {openSidebare && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
