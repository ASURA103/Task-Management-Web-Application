import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function CreateTaskModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreate({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setFormData({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      dueDate: "",
      tags: "",
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        text-black
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-999
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          mx-4
          bg-white
          dark:bg-slate-900
          rounded-2xl
          shadow-2xl
          border
          border-slate-200
          dark:border-slate-700
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-slate-200
            dark:border-slate-700
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              dark:text-white
            "
          >
            Create Task
          </h2>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="
            cursor-pointer
              p-2
              rounded-lg
              hover:bg-slate-100
              dark:hover:bg-slate-800
            "
          >
            <X />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              className="
                block
                mb-2
                font-medium
                dark:text-white
              "
            >
              Title
            </label>

            <input
              type="text"
              name="title"
              required
              minLength={3}
              maxLength={120}
              value={formData.title}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
              "
            />
          </div>

          <div>
            <label
              className="
                block
                mb-2
                font-medium
                dark:text-white
              "
            >
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
              "
            />
          </div>

          <div
            className="
              grid
              md:grid-cols-3
              gap-4
            "
          >
            <div>
              <label
                className="
                  block
                  mb-2
                  dark:text-white
                "
              >
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="
                cursor-pointer
                  w-full
                  p-3
                  rounded-xl
                  border
                  dark:bg-slate-800
                  dark:border-slate-700
                  dark:text-white
                "
              >
                <option value="low">Low</option>

                <option value="medium">Medium</option>

                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label
                className="
                  block
                  mb-2
                  dark:text-white
                "
              >
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                cursor-pointer
                  w-full
                  p-3
                  rounded-xl
                  border
                  dark:bg-slate-800
                  dark:border-slate-700
                  dark:text-white
                "
              >
                <option value="pending">Pending</option>

                <option value="in-progress">In Progress</option>

                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                className="
                  block
                  mb-2
                  dark:text-white
                "
              >
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="
                cursor-pointer
                  w-full
                  p-3
                  rounded-xl
                  border
                  dark:bg-slate-800
                  dark:border-slate-700
                  dark:text-white
                "
              />
            </div>
          </div>

          <div>
            <label
              className="
                block
                mb-2
                dark:text-white
              "
            >
              Tags
            </label>

            <input
              type="text"
              name="tags"
              placeholder="react, frontend, urgent"
              value={formData.tags}
              onChange={handleChange}
              className="
                w-full
                p-3
                rounded-xl
                border
                dark:bg-slate-800
                dark:border-slate-700
                dark:text-white
              "
            />
          </div>

          <button
            type="submit"
            className="
            cursor-pointer
              w-full
              py-3
              rounded-xl
              bg-sky-600
              hover:bg-sky-700
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <Plus size={18} />
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
