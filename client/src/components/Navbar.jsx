import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Moon, Sun, Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "./ThemeContext";

export default function Navbar({
  search = "",
  setSearch = () => {},
  sidebarOpen = false,
  setSidebarOpen = () => {},
  openLogin,
  openRegister,
}) {
  const { theme, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const username = user?.name || "User";

  const initial = username.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { logout } = useAuth();

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      backdrop-blur-xl
      bg-white/70
      dark:bg-slate-950/70
      border-b
      border-slate-200
      dark:border-slate-800
    "
    >
      <div
        className="
        mx-auto
        px-6
        h-20
        flex
        items-center
        justify-between
        gap-6
      "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {token && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
                p-2
                rounded-xl
                hover:bg-slate-100
                dark:text-white
                hover:cursor-pointer
                dark:hover:bg-slate-800
                transition
              "
            >
              <Menu size={24} />
            </button>
          )}

          <Link to={token ? "/dashboard" : "/"} className="flex items-center">
            <img src="logo.png" alt="logo" className="h-14" />

            <div className="ml-1 select-none">
              <span
                className="
                text-5xl
                font-bold
                bg-linear-to-r
                from-black
                via-blue-700
                to-sky-400
                text-transparent
                bg-clip-text
                 dark:text-white 
              "
              >
                Task
              </span>

              <span
                className="
                text-5xl
                font-bold
                bg-linear-to-r
                from-sky-400
                via-blue-500
                to-indigo-500
                text-transparent
                bg-clip-text
              "
              >
                Flow
              </span>

              <p
                className="
                text-[10px]
                text-gray-500
                ml-1
              "
              >
                Plan better. Stay focused. Get more done.
              </p>
            </div>
          </Link>
        </div>

        {/* CENTER SEARCH */}
        {token && (
          <div
            className=" relative
            hidden
            md:flex
            flex-1
          dark:text-white
            max-w-2xl
            items-center
          "
          >
            {" "}
            <Search
              size={28}
              className="
              cursor-text
              absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="
              pl-12
                w-full
                px-5
                py-3
                rounded-2xl
                border
               
                border-slate-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                outline-none
                focus:ring-2
                focus:ring-cyan-500
                transition
              "
            />
          </div>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="
            hover:cursor-pointer
              p-2
              rounded-xl
              hover:bg-slate-100
              dark:hover:bg-slate-800 *:dark:text-yellow-400
              transition
            "
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          {/* LOGGED OUT */}
          {!token && (
            <div className="flex gap-3">
              <button
                onClick={openLogin}
                className="
                hover:cursor-pointer
                  font-semibold
                  hover:text-cyan-500
                "
              >
                Login
              </button>

              <button
                onClick={openRegister}
                className="
                  px-4
                  py-2
                  rounded-xl
                  hover:cursor-pointer
                  bg-cyan-600
                  hover:bg-cyan-700
                  text-white
                  transition
                "
              >
                Register
              </button>
            </div>
          )}

          {/* LOGGED IN */}
          {token && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="
                  w-11
                  h-11
                  rounded-full
                  hover:cursor-pointer
                  bg-linear-to-r
                  from-cyan-500
                  to-blue-600
                  text-white
                  font-bold
                  text-lg
                  shadow-lg
                "
              >
                {initial}
              </button>

              {showMenu && (
                <div
                  className="
                  absolute
                  right-0
                  mt-3
                  w-52
                  bg-white
                  hover:cursor-pointer
                  dark:text-white
                  dark:bg-slate-900
                  rounded-2xl
                  shadow-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  overflow-hidden
                "
                >
                  <div
                    className="
                    px-4
                    py-3
                    border-b
                    dark:border-slate-700
                  "
                  >
                    <p
                      className=" flex   hover:text-sky-700  
                bg-clip-text text-2xl  items-center font-bold "
                    >
                      <User className="mr-1 " />
                      {username}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      cursor-pointer
                      text-red-500
                      hover:bg-red-50
                      dark:hover:bg-red-950/30
                    "
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {token && (
        <div className=" md:hidden dark:text-white items-center px-4 pb-4">
          <Search
            size={28}
            className="
            cursor-text
              absolute
          left-6
          mt-2.5
          text-slate-400
        "
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="
              w-full
              pl-12
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
            "
          />
        </div>
      )}
    </nav>
  );
}
