import { useEffect } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { useTaskContext } from "../../contexts/TaskContext";

export default function Trash() {
  const { trashTasks, fetchTrashTasks, restoreTask, permanentDeleteTask } =
    useTaskContext();

  useEffect(() => {
    fetchTrashTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 dark:text-red-500">🗑 Trash</h1>
      {trashTasks.length === 0 ? (
        <p className="text-slate-500">Trash is empty</p>
      ) : (
        <div className="grid gap-4">
          {trashTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border flex justify-between items-center"
            >
              {/* TASK INFO */}
              <div>
                <h2 className="font-semibold dark:text-white">{task.title}</h2>
                <p className="text-sm text-slate-500">{task.description}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <button
                  onClick={() => restoreTask(task._id)}
                  className="flex cursor-pointer items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg"
                >
                  <RotateCcw size={16} />
                  Restore
                </button>

                <button
                  onClick={() => permanentDeleteTask(task._id)}
                  className="flex cursor-pointer items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
