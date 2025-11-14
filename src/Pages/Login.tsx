import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useLoginMutation } from "../Redux/api/AdminLogin";
import { isAdmin } from "../Utils/CheckIsAdmin";
import { useNavigate } from "react-router";
import { OureContext } from "../context/globale";

const Login = () => {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [validation, setValidation] = useState("");
  const [adminAllowed, setAdminAllowed] = useState(true);
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const context = useContext(OureContext);
  if (!context) throw new Error("Login context undefined");

  const { setIslogin } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(form).unwrap();

      // Save token
      localStorage.setItem("token", res.data.jwtToken);

      // Check role
      const role = isAdmin();

      if (role === "ADMIN") {
        setIslogin(true);
        localStorage.setItem("login", "true");
        navigate("/");
      } else {
        setAdminAllowed(false);
        setValidation("You can't access the dashboard");
      }
    } catch (err) {
      console.log(err);
      setValidation("Invalid username or password");
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
            Login
          </motion.button>
        </form>

        {!adminAllowed && (
          <p className="text-red-500 font-mono text-center mt-5">
            {validation}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
