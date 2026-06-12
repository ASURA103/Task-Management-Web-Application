import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">

      {/* SIDEBAR (DRAWER STYLE) */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full">

        {/* NAVBAR */}
        <Navbar
          search={search}
          setSearch={setSearch}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6">
          {/* Your dashboard content here */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Dashboard
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Welcome back 👋
          </p>

          {/* Example content area */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow">
              Card 1
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow">
              Card 2
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow">
              Card 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}