import { HomeIcon, User, LogOut, User2, UserCircle2, HouseHeartIcon, ChartColumnIcon } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router";
import { OureContext } from "../context/globale";

const Sidebar = () => {
  const context = useContext(OureContext);
  if (!context) throw new Error("Sidebar must be used within OureProvider");
  const { openSidebare } = context;

  const menuItems = [
    { icon: <HomeIcon />, title: "Dashboard", link: "/" },
    { icon: <User2 />, title: "Users", link: "/customer" },
    { icon: <UserCircle2 />, title: "Agent", link: "/agent" },
    { icon: <User />, title: "Broker", link: "/broker" },
    { icon: <HouseHeartIcon />, title: "Property", link: "/property" },
    { icon: <ChartColumnIcon />, title: "Analytics", link: "/analytics" },
    { icon: <LogOut onClick={()=>localStorage.removeItem("token")}/>, title: "Sign Out",link:'/' },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white flex flex-col transition-all duration-300
        ${openSidebare ? "w-64" : "w-20"}
      `}
    >
      {openSidebare && (
        <div className="p-4 text-lg md:text-2xl font-bold">Brand Name</div>
      )}
      <ul className="flex-1 mt-4">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.link}>
            <li>
              <div
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 w-full"
                title={!openSidebare ? item.title : undefined} 
              >
                <span>{item.icon}</span>
                {openSidebare && <span>{item.title}</span>}
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
