import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        ...task,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed dark:text-white inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6">
        {/* Header */}
        <div className="flex cursor-pointer justify-between mb-6">
          <h2 className="text-xl font-bold dark:text-white">Edit Task</h2>

          <button className="cursor-pointer" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Title */}
        <input
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Title"
          className="w-full border rounded-xl p-3 mb-4"
        />

        {/* Description */}
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          placeholder="Description"
          className="w-full border rounded-xl p-3 mb-4"
        />
        {/* status */}
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full cursor-pointer dark:bg-slate-900 border rounded-xl p-3 mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Priority */}
        <select
          value={form.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className="w-full cursor-pointer dark:bg-slate-900 border rounded-xl p-3 mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        {/* Save */}
        <button
          onClick={() => onSave(form)}
          className="w-full cursor-pointer bg-cyan-600 text-white py-3 rounded-xl"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}
