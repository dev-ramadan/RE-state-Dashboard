const url = import.meta.env.VITE_BASE_URL
export const getRole = async (id: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${url}/UserRole/user-roles/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`

        }
    })
    const role = await res.json();
    
    return role.data
}
