import {
  LayoutDashboard,
  CheckCircle,
  User,
  Trash,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  open,
  logout,
  activeSection,
  setActiveSection,
  setSidebarOpen,
}) {
  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`
        
        mt-35
        md:mt-20
        fixed
        left-0
        top-0
        h-[84%]
        md:h-[90%]
         md:w-72
        w-40
        bg-white
        dark:bg-slate-950
        border-r
        border-slate-200
        dark:border-slate-800
        transition-all
        duration-300
        z-40

        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-6 h-full flex flex-col justify-between">
        {/* TOP */}
        <div className="space-y-5">
          <button
            onClick={() => handleSectionChange("tasks")}
            className={`
              flex
              cursor-pointer
              items-center
              gap-3
              transition-all
              duration-200
              hover:text-sky-500
              hover:font-bold
              hover:text-xl

              ${
                activeSection === "tasks"
                  ? "text-sky-500 font-bold"
                  : "dark:text-white"
              }
            `}
          >
            <LayoutDashboard />
            Tasks
          </button>

          <button
            onClick={() => handleSectionChange("completed")}
            className={`
              flex
              cursor-pointer
              items-center
              gap-3
              transition-all
              duration-200
              hover:text-green-500
              hover:font-bold
              hover:text-xl

              ${
                activeSection === "completed"
                  ? "text-green-500 font-bold"
                  : "dark:text-white"
              }
            `}
          >
            <CheckCircle />
            Completed
          </button>

          <button
            onClick={() => handleSectionChange("account")}
            className={`
              flex
              cursor-pointer
              items-center
              gap-3
              transition-all
              duration-200
              hover:text-blue-500
              hover:font-bold
              hover:text-xl

              ${
                activeSection === "account"
                  ? "text-blue-500 font-bold"
                  : "dark:text-white"
              }
            `}
          >
            <User />
            Account
          </button>
        </div>

        {/* BOTTOM */}
        <div className="space-y-5">
          <button
            onClick={() => handleSectionChange("trash")}
            className={`
              flex
              cursor-pointer
              items-center
              gap-3
              transition-all
              duration-200
              hover:text-red-500
              hover:font-bold
              hover:text-xl

              ${
                activeSection === "trash"
                  ? "text-red-500 font-bold"
                  : "text-red-500"
              }
            `}
          >
            <Trash />
            Trash
          </button>

          <button
            onClick={logout}
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              dark:text-white
              hover:text-red-500
              hover:font-bold
              hover:text-xl
              transition-all
              duration-200
            "
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
