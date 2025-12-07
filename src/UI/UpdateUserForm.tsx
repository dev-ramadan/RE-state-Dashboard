import { motion } from "framer-motion";
import { useAddUserRoleMutation, useGetRolesQuery } from "../Redux/api/Role";
import { useContext, useState } from "react";
import { OureContext } from "../context/globale";
import toast from "react-hot-toast";

const UpdateUserForm = ({ id }: any) => {
    const [roles, setRoles] = useState({
        userId: id,
        roleId: "",
    });
    const context = useContext(OureContext);
    if (!context) throw new Error("OureContext is undefined");
    const { roleForm, setRoleForm,setEdit } = context;
    const [addUserRole] = useAddUserRoleMutation();

    const { data: role, isLoading } = useGetRolesQuery();

    const handleAddRole = async () => {
        try {
            await addUserRole(roles);
            toast.success('Role Added successfully!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setEdit(true)
            setRoleForm(false)
        } catch { }
    };
    if (isLoading) return <p className="animate-bounce">loading...</p>;

    return (
        <>
            {
                roleForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div>
                            <select
                                className="border p-2 rounded"
                                value={roles.roleId}
                                onChange={(e) =>
                                    setRoles((prev) => ({ ...prev, roleId: e.target.value }))
                                }
                            >
                                <option value=""> Select Role</option>
                                {role?.map((item: any) => (
                                    <option key={item.roleId} value={item.roleId}>
                                        {item.roleName}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleAddRole}
                                className="ml-3 bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Add Role
                            </button>
                        </div>
                    </motion.div>
                )
            }
        </>
    );
};

export default UpdateUserForm;
