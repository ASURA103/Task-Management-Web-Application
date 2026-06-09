import { useState } from "react";
import axios from "axios";
import B_URL from "../../config";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Account() {
  const [openUpdate, setOpenUpdate] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useAuth();

  const token = localStorage.getItem("token");

  const headers = () => ({
    Authorization: `Bearer ${token}`,
  });

  // UPDATE USER
  const handleUpdate = async () => {
    try {
      const payload = {};

      if (name.trim()) payload.name = name;
      if (password.trim()) payload.password = password;

      const res = await axios.put(`${B_URL}/user/update`, payload, {
        headers: headers(),
      });

      setUser(res.data.user);

      localStorage.setItem("name", res.data.user.name);

      if (res.data.user.email) {
        localStorage.setItem("email", res.data.user.email);
      }

      toast.success("Account updated successfully");

      setName("");
      setPassword("");
      setOpenUpdate(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  // DELETE USER
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?",
      );

      if (!confirmDelete) return;

      await axios.delete(`${B_URL}/user/delete`, {
        headers: headers(),
      });

      localStorage.clear();

      toast.success("Account deleted successfully");

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Account Settings
      </h1>

      <div className="mb-6 shadow-current hover:dark:bg-gray-800 hover:font-bold hover:text-xl  cursor-pointer hover:shadow-md p-4 rounded-xl border dark:border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Username
            </p>

            <p className="font-semibold dark:text-white">
              {user?.name || "Unknown User"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>

            <p className="font-semibold dark:text-white">
              {user?.email || "No Email"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpenUpdate(true)}
        className="w-full bg-cyan-500 hover:text-blue-950 hover:font-bold text-white py-2 rounded-lg hover:bg-cyan-600"
      >
        Change User Info
      </button>

      <button
        onClick={handleDelete}
        className="w-full mt-4 cursor-pointer hover:text-blue-950 hover:font-bold bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
      >
        Delete Account
      </button>

      {openUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Update Account
            </h2>

            <input
              type="text"
              placeholder="New Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-3 rounded-lg border dark:bg-slate-800 dark:text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 rounded-lg border dark:bg-slate-800 dark:text-white"
            />

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600"
              >
                Update
              </button>

              <button
                onClick={() => setOpenUpdate(false)}
                className="flex-1 bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
