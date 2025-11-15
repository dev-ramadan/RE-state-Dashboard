import { Outlet, useNavigate } from "react-router"
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import { useContext, useEffect } from "react"
import { isAdmin } from "../Utils/CheckIsAdmin"
import { OureContext } from "../context/globale"


const Layout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const role = isAdmin();

    const context = useContext(OureContext);
if (!context) {
  throw new Error("Topbar must be used within OureProvider");
}

const { setIslogin } = context;

useEffect(() => {
  const interval = setInterval(() => {
    localStorage.removeItem("token");
    setIslogin(false);
    navigate("/login");
  }, 19 * 60 * 1000);

  return () => clearInterval(interval);
}, []);

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