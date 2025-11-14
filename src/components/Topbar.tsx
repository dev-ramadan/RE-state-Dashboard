// src/components/admin/Topbar.tsx
import { Menu, Search } from "lucide-react";
import { useContext } from "react";
import { OureContext } from "../context/globale";

const Topbar = () => {
  const context = useContext(OureContext);
  if (!context) {
    throw new Error("Topbar must be used within OureProvider");
  }
  const { openSidebare, setOpenSidebare } = context;

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-4">
        <button
          className="text-gray-600"
          onClick={() => setOpenSidebare(!openSidebare)}
        >
          <Menu />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div>
        <img
          src="/assets/imgs/customer01.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
