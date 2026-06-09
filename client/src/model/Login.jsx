import { useState } from "react";
import axios from "axios";
import B_URL from "../../config.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login({ switchToRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${B_URL}/user/login`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("type", "user");

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full">
      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>

      {/* SWITCH TO REGISTER */}
      <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-blue-600 font-semibold hover:underline"
        >
          Register here
        </button>
      </p>
    </div>
  );
}
