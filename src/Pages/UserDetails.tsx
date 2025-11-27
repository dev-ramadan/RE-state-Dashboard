import { useParams } from "react-router";
import { Mail, Phone, MapPin, User2, BoxesIcon, } from "lucide-react";
import { motion } from "framer-motion";
import { useGetUserByIdQuery } from "../Redux/api/Users";
import { getRole } from "../Utils/getUserRole";
import { useContext, useEffect, useState } from "react";
import UpdateUserForm from "../UI/UpdateUserForm";
import { OureContext } from "../context/globale";
import DeleteUserRole from "../UI/DeleteUserRole";

type RolePropse = {
  roleId:string;
  roleName:any
}
const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userRes, isLoading, isError } = useGetUserByIdQuery(id!);
  const user = userRes?.data
  const [role, setRole] = useState<RolePropse[]>([])
  const context = useContext(OureContext);
  if (!context) throw new Error("OureContext is undefined");
  const { roleForm, addRole,setRoleForm, setAddRole } = context;
  useEffect(() => {
    const checkRole = async () => {
      const role = await getRole(id!);
      setRole(role.roles)
    }
    checkRole()
  }, [id, roleForm,addRole])
  
  console.log(role);
  


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading ...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Failed to load user.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-6">
          {/* صورة المستخدم */}
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md flex justify-center items-center flex-shrink-0 ">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : <User2 size={70} />
            }
          </div>

          {/* تفاصيل المستخدم */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user?.username}</h1>
            <p className="text-gray-600">{user?.agencyName || "Real Estate Agent"}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5 text-green-500" />
                <span>{user?.phoneNumber || "----"}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <BoxesIcon className="w-5 h-5 text-indigo-300" />
                {role.map((item) => (
                  <span key={item.roleId}>{item.roleName}</span>
                ))}
              </div>

              {user?.dateJoined && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{user?.dateJoined}</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <p className="text-gray-700">
                {user?.experienceYears || "This agent has not added a bio yet."}
              </p>
            </div>

            <UpdateUserForm id={user.userId} />
            <DeleteUserRole id={user.userId} />
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-300">
              Contact Agent
            </button>
            <button className="ml-2 mt-6 px-6 py-2 bg-orange-300 text-white rounded-lg shadow hover:bg-orange-600 transition-all duration-300"
              onClick={() => {
                setRoleForm(true)
              }}
            >
              Add New Role
            </button>
            <button className="ml-2 mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-300"
              onClick={() => setAddRole(true)}>
              Delete Role
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;
