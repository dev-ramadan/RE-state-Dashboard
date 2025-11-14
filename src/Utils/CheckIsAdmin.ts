import { jwtDecode } from "jwt-decode";
interface IToken {
    [key: string]: string
}
export const isAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decode: IToken = jwtDecode(token)
        const roleKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        return decode[roleKey] || null
    }
}