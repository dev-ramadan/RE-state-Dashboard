import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useLoginMutation } from "../Redux/api/AdminLogin";
import { isAdmin } from "../Utils/CheckIsAdmin";
import { useNavigate } from "react-router";
import { OureContext } from "../context/globale";
import { Loader } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [validation, setValidation] = useState("");
  const [adminAllowed, setAdminAllowed] = useState(true);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const context = useContext(OureContext);
  if (!context) throw new Error("Login context undefined");

  const { setIslogin, setUserId } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setValidation("");      
    setAdminAllowed(true);    

    try {
      const res = await login(form).unwrap();

      // حفظ التوكن والـ userId
      localStorage.setItem("token", res.data.jwtToken);
      localStorage.setItem("userId", res.data.userId);
      setUserId(res.data.userId);

      // فحص الرول
      const role = isAdmin();

      if (role === "ADMIN") {
        setIslogin(true);
        localStorage.setItem("login", "true");
        navigate("/");
      } else {
        localStorage.removeItem("token");  
        localStorage.removeItem("login");
        setAdminAllowed(false);
        setValidation("You don't have admin privileges to access the dashboard");
      }
    } catch (err: any) {
      console.log(err);

      let errorMsg = "Invalid username or password";

      if (err?.data?.message) {
        errorMsg = err.data.message;
      }

      setValidation(errorMsg);
      setAdminAllowed(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-full border border-white/20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-white text-sm">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg duration-200"
          >
            {loading ? <Loader className="animate-spin mx-auto" size={15} /> : "Login"}
          </motion.button>
        </form>

        {!adminAllowed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 font-medium text-center mt-5 bg-red-900/30 px-4 py-2 rounded-lg"
          >
            {validation || 'Invalid username or password'}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
