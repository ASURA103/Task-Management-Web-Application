import { useState, useRef, useEffect } from "react";
import { Funnel, Pin, Calendar, X } from "lucide-react";

export default function FilterPanel({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // PRIORITY
  const togglePriority = (priority) => {
    setFilters((prev) => ({
      ...prev,
      priority: prev.priority.includes(priority)
        ? prev.priority.filter((p) => p !== priority)
        : [...prev.priority, priority],
    }));
  };

  // STATUS
  const toggleStatus = (status) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  // PINNED
  const togglePinned = () => {
    setFilters((prev) => ({
      ...prev,
      isPinned: !prev.isPinned,
    }));
  };

  // DUE
  const setDue = (value) => {
    setFilters((prev) => ({
      ...prev,
      due: prev.due === value ? "" : value,
    }));
  };

  // RESET ALL FILTERS
  const resetFilters = () => {
    setFilters({
      priority: [],
      status: [],
      isPinned: false,
      due: "",
    });
  };

  return (
    <div ref={ref} className="relative dark:text-white inline-block">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl"
      >
        <Funnel size={18} />
        Filters
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-64 bg-white dark:bg-slate-900 border rounded-xl shadow-lg p-4 z-50">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold dark:text-white">Filters</h2>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 cursor-pointer hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>

          {/* PRIORITY */}
          <p className="text-xs text-slate-500 mb-2">Priority</p>
          {["high", "medium", "low"].map((p) => (
            <button
              key={p}
              onClick={() => togglePriority(p)}
              className={`block cursor-pointer w-full text-left px-3 py-2 rounded-lg mb-1 ${
                filters.priority.includes(p)
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {p}
            </button>
          ))}

          {/* STATUS */}
          <p className="text-xs text-slate-500 mt-3 mb-2">Status</p>
          {["pending", "in-progress", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => toggleStatus(s)}
              className={`block cursor-pointer w-full text-left px-3 py-2 rounded-lg mb-1 ${
                filters.status.includes(s)
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {s}
            </button>
          ))}

          {/* PINNED */}
          <button
            onClick={togglePinned}
            className={`flex cursor-pointer items-center gap-2 w-full mt-3 px-3 py-2 rounded-lg ${
              filters.isPinned
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Pin size={16} />
            Pinned Only
          </button>

          {/* DUE DATE */}
          <p className="text-xs text-slate-500 mt-3 mb-2">Due Date</p>

          <button
            onClick={() => setDue("today")}
            className={`flex cursor-pointer items-center gap-2 w-full px-3 py-2 rounded-lg mb-1 ${
              filters.due === "today"
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Calendar size={16} />
            Today
          </button>

          <button
            onClick={() => setDue("overdue")}
            className={`flex cursor-pointer items-center gap-2 w-full px-3 py-2 rounded-lg mb-1 ${
              filters.due === "overdue"
                ? "bg-red-500 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Calendar size={16} />
            Overdue
          </button>

          <button
            onClick={() => setDue("")}
            className={`flex cursor-pointer items-center gap-2 w-full px-3 py-2 rounded-lg ${
              !filters.due
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Calendar size={16} />
            All
          </button>

          {/* RESET BUTTON */}
          <button
            onClick={resetFilters}
            className="w-full cursor-pointer mt-4 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
