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
    <div className="flex items-center justify-between p-4 bg-white shadow ">
      <div className="flex items-center gap-4">
        <button
          className="text-gray-600"
          onClick={() => setOpenSidebare(!openSidebare)}
        >
          <Menu />
        </button>
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
