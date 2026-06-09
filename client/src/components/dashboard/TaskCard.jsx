import { Pencil, Trash2, Pin } from "lucide-react";
import { getDueTag } from "./dueDateHelpers.js";

export default function TaskCard({ task, onEdit, onDelete, onPin }) {
  const dueTag = getDueTag(task.dueDate, task.status);

  const statusColor = {
    pending:
      " bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    "in-progress":
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

    completed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  const priorityColor = {
    low: "bg-slate-100 text-slate-700",

    medium: "bg-orange-100 text-orange-700",

    high: "bg-red-100 text-red-700",
  };

  return (
    <div
      className="
      bg-white
      dark:text-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-5
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
    "
    >
      <div className="flex justify-between items-center mb-4">
        <button className="cursor-pointer" onClick={() => onPin(task._id)}>
          <Pin
            size={18}
            className={task.isPinned ? "  text-yellow-500" : "text-slate-400"}
          />
        </button>
        {dueTag && (
          <div
            className="
              mt-3
              inline-block
              px-3
              py-1
              rounded-full
              bg-red-100
              text-red-600
              text-xs
              font-semibold
            "
          >
            {dueTag}
          </div>
        )}

        <div className="flex gap-2">
          <button className="cursor-pointer" onClick={() => onEdit(task)}>
            <Pencil size={18} className="text-blue-500" />
          </button>

          <button className="cursor-pointer" onClick={() => onDelete(task._id)}>
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <span
          className={`
            px-4 py-1 rounded-full text-sm font-semibold
            ${statusColor[task.status]}
          `}
        >
          {task.status}
        </span>
      </div>

      <h2 className="font-bold text-xl mb-2 dark:text-white">{task.title}</h2>

      <p className="text-slate-500 dark:text-slate-400 mb-4">
        {task.description}
      </p>

      <div className="flex justify-between items-center">
        <span
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${priorityColor[task.priority]}
          `}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="text-xs text-slate-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
