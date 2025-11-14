import { Outlet, useNavigate } from "react-router"
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react"
import { isAdmin } from "../Utils/CheckIsAdmin"


const Layout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const role = isAdmin();

  useEffect(() => {
    if (!token || role !== "ADMIN") {
      navigate("/login");
    }
  }, [token, role, navigate]);

  if (!token || role !== "ADMIN") return null;
    return (
        <div className="flex h-screen relative">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <div className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout