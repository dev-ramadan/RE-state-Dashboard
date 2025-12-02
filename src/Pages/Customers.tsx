import { useDeleteUserMutation, useGetCustomersQuery } from "../Redux/api/Users";
import { Trash2,Info, ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface IProps { }

const Customers = ({ }: IProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 8;
  const { data: users, isError, isLoading } = useGetCustomersQuery({ pageNumber, pageSize });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error("Failed to delete broker:", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading users...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to fetch users</p>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-auto rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.userId}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-4">{user.userId}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phoneNumber}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-red-100 text-red-500 transition"
                    title="Delete"
                  >
                    <Trash2 onClick={() => handleDelete(user.userId)} />
                  </button>
                  <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                    <Link to={`/userDetails/${user.userId}`}> <Info /> </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center gap-3 mx-auto my-12">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowBigLeftDash />
          </button>
          <span className="px-4 py-2 font-medium">{pageNumber}</span>
          <button
            onClick={() => setPageNumber(prev => prev + 1)}
            disabled={users?.length! < pageSize}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowBigRightDash />
          </button>
        </div>
      </div>

      {/* Card view for smaller screens */}
      <div className="md:hidden flex flex-col gap-4">
        {users?.map((user) => (
          <div
            key={user.userId}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{user.username}</h2>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-red-100 text-red-500 transition">
                  <Trash2 onClick={() => handleDelete(user.userId)} />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                  <Link to={`/userDetails/${user.userId}`}> <Info /> </Link>
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Phone:</span> {user.phoneNumber}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">ID:</span> {user.userId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
