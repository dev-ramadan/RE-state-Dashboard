import { Link } from "react-router";
import { useDeleteAgentMutation, useGetAgentQuery } from "../Redux/api/Agent";
import { Trash2, Edit, Info } from "lucide-react";

interface IProps { }

const Agent = ({ }: IProps) => {
  const { data: agents, isError, isLoading } = useGetAgentQuery();
  const [deleteAgent] = useDeleteAgentMutation()

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteAgent(id).unwrap();
      console.log("Deleted successfully:", res);
    } catch (err) {
      console.error("Failed to delete agent:", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading Agent...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to fetch Agent</p>
      </div>
    );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Agent</h1>

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
            {agents?.map((agent) => (
              <tr
                key={agent.user.userId}
                className="border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-4">{agent.user.userId}</td>
                <td className="py-2 px-4">{agent.user.username}</td>
                <td className="py-2 px-4">{agent.user.email}</td>
                <td className="py-2 px-4">{agent.user.phoneNumber}</td>
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
                    onClick={() => handleDelete(agent.id)}
                  >
                    <Trash2 />
                  </button>
                  <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                    <Link to={`/userDetails/${agent.user.userId}`}> <Info /> </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="md:hidden flex flex-col gap-4">
        {agents?.map((agent) => (
          <div
            key={agent.user.userId}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{agent.user.username}</h2>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-yellow-100 text-yellow-500 transition">
                  <Edit />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-red-500 transition"
                  onClick={() => handleDelete(agent.id)}
                >
                  <Trash2 />
                </button>
                <button className="p-1 rounded hover:bg-red-100 text-green-500 transition">
                  <Link to={`/userDetails/${agent.user.userId}`}> <Info /> </Link>
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Email:</span> {agent.user.email}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Phone:</span> {agent.user.phoneNumber}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">ID:</span> {agent.user.userId}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agent;
