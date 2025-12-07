import { motion } from "framer-motion";
import { useRemoveUserRoleMutation } from "../Redux/api/Role";
import { useContext, useEffect, useState } from "react";
import { OureContext } from "../context/globale";
import { getRole } from "../Utils/getUserRole";
import toast from "react-hot-toast";


const DeleteUserRole = ({ id }: any) => {
    const context = useContext(OureContext);
    if (!context) return null;
    const { addRole, setAddRole, edit,setEdit } = context;
    const [removeUserRole, { isLoading }] = useRemoveUserRoleMutation();
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [role, setRole] = useState<any>({
        userId: id,
        roleId: '',
    });
    useEffect(() => {
        const checkRole = async () => {
            const uRole: any = await getRole(id);
            setRole(uRole)
        }
        checkRole()
    }, [id,edit])

    const handleDeleteRole = async () => {
        if (!selectedRoleId) return toast("⚠  Please Select Role!");
        const body = {
            userId: id,
            roleId: selectedRoleId
        };
        try {
            await removeUserRole(body);
            toast.success('Role Deleted successfully!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            setEdit(false)
            setAddRole(false);
        } catch { }
    };
    return (
        <>
            {addRole && (
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                    <div>
                        <select
                            className="border p-2 rounded"
                            value={selectedRoleId}
                            onChange={(e) => setSelectedRoleId(e.target.value)}
                        >
                            <option value="">Select Role</option>
                            {role.roles?.map((item: any) => (
                                <option key={item.roleId} value={item.roleId}>
                                    {item.roleName}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleDeleteRole}
                            className="ml-3 bg-red-600 text-white px-4 py-2 rounded"
                            disabled={isLoading}
                        >
                            {isLoading ? "Deleting..." : "Delete Role"}
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default DeleteUserRole;
