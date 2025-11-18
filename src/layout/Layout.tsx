import { Outlet, useNavigate } from "react-router";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useContext, useEffect } from "react";
import { OureContext } from "../context/globale";
import { isTokenExpired } from "../Utils/tokenExpired";

const Layout = () => {
  const navigate = useNavigate();
  const context = useContext(OureContext);
  if (!context) throw new Error("OureContext is undefined");
  const { setIslogin } = context;

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    setIslogin(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (isTokenExpired()) {
      logoutUser();
      return;
    }

    const interval = setInterval(() => {
      if (isTokenExpired()) {
        logoutUser();
      }
    }, 10_000);

    return () => clearInterval(interval);
  }, [navigate, setIslogin]);

  if (isTokenExpired()) {
    logoutUser();
    return null;
  }

  return (
    <div className="flex h-screen relative">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;