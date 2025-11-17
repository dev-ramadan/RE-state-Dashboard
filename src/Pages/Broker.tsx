import { Link } from "react-router";
import { useDeleteBrokerMutation, useGetBrokerQuery } from "../Redux/api/Broker";
import { Trash2, Edit, Info } from "lucide-react";

interface IProps { }

const Broker = ({ }: IProps) => {
  const { data: brokers, isError, isLoading } = useGetBrokerQuery();
  const [deleteBroker] = useDeleteBrokerMutation()

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBroker(id).unwrap();
      console.log("Deleted successfully:", res);
    } catch (err) {
      console.error("Failed to delete broker:", err);
    }
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">Loading Broker...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to fetch Broker</p>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Broker</h1>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
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
            {brokers?.map((broker) => (
              <tr
                key={broker.user.userId}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-4">{broker.user.userId}</td>
                <td className="py-2 px-4">{broker.user.username}</td>
                <td className="py-2 px-4">{broker.user.email}</td>
                <td className="py-2 px-4">{broker.user.phoneNumber}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-yellow-100 text-yellow-500 transition"
                    title="Edit"
                  >
                    <Edit />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-100 text-red-500 transition"
                    title="Delete"
                  >
                    <Trash2 onClick={() => handleDelete(broker.id)} />
                  </button>
                  <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                    <Link to={`/userDetails/${broker.user.userId}`}> <Info /> </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="md:hidden flex flex-col gap-4">
        {brokers?.map((broker) => (
          <div
            key={broker.user.userId}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{broker.user.username}</h2>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-yellow-100 text-yellow-500 transition">
                  <Edit />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-red-500 transition">
                  <Trash2 onClick={() => handleDelete(broker.id)} />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                  <Link to={`/userDetails/${broker.user.userId}`}> <Info /> </Link>
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> {broker.user.email}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Phone:</span> {broker.user.phoneNumber}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">ID:</span> {broker.user.userId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Broker;
