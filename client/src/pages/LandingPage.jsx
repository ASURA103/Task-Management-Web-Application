import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

import Login from "../model/Login";
import Register from "../model/Register";

export default function LandingPage() {
  const [users, setUsers] = useState(0);

  const [authMode, setAuthMode] = useState(null);
  // "login" | "register" | null
  f;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data.length))
      .catch(() => toast.error("Failed to fetch data"));
  }, []);

  const onSubmit = (data) => {
    toast.success(`Subscribed: ${data.email}`);
    reset();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white">
      {/* NAVBAR */}
      <Navbar
        openLogin={() => setAuthMode("login")}
        openRegister={() => setAuthMode("register")}
      />

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl font-bold mb-6">All Your Tasks IN One Place</h1>
        <h1 className="text-5xl font-bold mb-6">Task</h1>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-12">
        {[
          {
            title: "Create Tasks",
            desc: "Add tasks with deadlines in seconds",
            icon: "📝",
          },
          {
            title: "Track Progress",
            desc: "Visualize completion with progress bars",
            icon: "📊",
          },
          {
            title: "Stay Notified",
            desc: "Get reminders for due dates",
            icon: "⏰",
          },
          {
            title: "Mark Completed",
            desc: "Check off tasks with ease",
            icon: "✅",
          },
          {
            title: "Organize Projects",
            desc: "Group tasks into boards",
            icon: "📂",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{card.desc}</p>
          </div>
        ))}
      </section>
      <section className="flex justify-around py-12 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-4xl font-bold">10,000+</h2>
          <p className="text-gray-600 dark:text-gray-300">Tasks Managed</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold">500+</h2>
          <p className="text-gray-600 dark:text-gray-300">Active Users</p>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold">4.9/5</h2>
          <p className="text-gray-600 dark:text-gray-300">User Rating</p>
        </div>
      </section>

      <img src="image.png" className="min-w-screen dark:hidden" />

      <img src="image1.png" className="min-w-screen hidden dark:block" />

      {/* LOGIN MODAL */}
      {authMode === "login" && (
        <Modal onClose={() => setAuthMode(null)}>
          <Login switchToRegister={() => setAuthMode("register")} />
        </Modal>
      )}

      {/* REGISTER MODAL */}
      {authMode === "register" && (
        <Modal onClose={() => setAuthMode(null)}>
          <Register switchToLogin={() => setAuthMode("login")} />
        </Modal>
      )}
    </div>
  );
}

/* MODAL WRAPPER */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
