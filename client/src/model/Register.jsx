import { useState } from "react";
import axios from "axios";
import B_URL from "../../config";
import toast from "react-hot-toast";

export default function Register({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${B_URL}/user/register`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("type", "user");

      toast.success(res.data.message && "Registration successfull");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message && "Invalid input format");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button className="w-full bg-cyan-600 text-white p-3 rounded">
          Create Account
        </button>
      </form>

      {/* SWITCH */}
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-cyan-600 font-semibold">
          Login
        </button>
      </p>
    </div>
  );
}
