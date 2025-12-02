import { Link } from "react-router";
import { useGetCustomersQuery } from "../Redux/api/Users";
import { DesktopTable, type Column } from "../UI/DesktopTable";
import type { Users } from "../types/usersTypes";
import { MobileTable } from "../UI/MobileTable";
const columns:Column<Users>[] |any= [
  { key: "userId", header: "ID" },
  { key: "username", header: "Name" },
  { key: "email", header: "Email" },
  { key: "phoneNumber", header: "Phone" },
];
const RecentUsers = () => {
  const { data, isError, isLoading } = useGetCustomersQuery({pageNumber:1,pageSize:4});
  const users = data?.items;
  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-center items-center h-auto">
        <span className="text-gray-500 animate-pulse">Loading users...</span>
      </div>
    );

  if (isError)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-red-600 font-semibold">
        Failed to load users 
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
        <Link to={'/customer'}>
        <button className="text-blue-600 text-sm font-medium hover:underline transition">
          View All
        </button>
        </Link>
      </div>

      {/*  TABLE - Visible on md and larger */}
      <DesktopTable columns={columns} data={users} sliceCount={4}/>

      {/*  MOBILE CARDS - Visible only on small screens */}
      <MobileTable columns={columns} data={users} maxItems={4}/>

    </div>
  );
};

export default RecentUsers;
