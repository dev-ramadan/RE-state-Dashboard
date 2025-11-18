import { Menu, User2Icon } from "lucide-react";
import { useContext } from "react";
import { OureContext } from "../context/globale";
import { useGetUserByIdQuery } from "../Redux/api/Users";

const Topbar = () => {
  const context = useContext(OureContext);
  if (!context) {
    throw new Error("Topbar must be used within OureProvider");
  }
  const { openSidebare, setOpenSidebare ,userId} = context;

  const {data:userRes} = useGetUserByIdQuery(userId);
  const user = userRes?.data
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
      <div className="flex gap-2 items-center justify-center">
        {/* <img
          src="/assets/imgs/customer01.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        /> */}
        <User2Icon/>
        <span>{user?.username}</span>
      </div>
    </div>
  );
};

export default Topbar;
