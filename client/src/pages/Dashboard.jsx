import { useState } from "react";
import { PlusIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import FilterPanel from "../components/dashboard/FilterPanel";
import TaskGrid from "../components/dashboard/TaskGrid";
import CreateTaskModal from "../components/dashboard/CreateTaskModal.jsx";
import TaskModal from "../components/dashboard/TaskModal.jsx";
import Trash from "../components/dashboard/Trash.jsx";
import Account from "../model/Account.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTaskContext } from "../contexts/TaskContext.jsx";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [activeSection, setActiveSection] = useState("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ FINAL FILTER STATE
  const [filters, setFilters] = useState({
    priority: [],
    status: [],
    isPinned: false,
    due: "",
  });

  const { tasks, fetchTasks, createTask, deleteTask, pinTask, updateTask } =
    useTaskContext();
  const { logout } = useAuth();

  // ================= FILTER LOGIC =================
  const filteredTasks = tasks.filter((task) => {
    const searchMatch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const priorityMatch =
      filters.priority.length === 0 || filters.priority.includes(task.priority);

    const statusMatch =
      !filters.status ||
      filters.status.length === 0 ||
      filters.status.includes(task.status);

    const pinnedMatch = !filters.isPinned || task.isPinned;

    const dueMatch = (() => {
      if (!filters.due) return true;
      if (!task.dueDate) return false;

      const today = new Date();
      const taskDate = new Date(task.dueDate);

      if (filters.due === "today") {
        return taskDate.toDateString() === today.toDateString();
      }

      if (filters.due === "overdue") {
        return taskDate < today && task.status !== "completed";
      }

      return true;
    })();

    return (
      searchMatch && priorityMatch && statusMatch && pinnedMatch && dueMatch
    );
  });

  // ================= GROUPING =================
  const pinned = filteredTasks.filter((task) => task.isPinned);

  const high = filteredTasks.filter(
    (task) => !task.isPinned && task.priority === "high",
  );

  const medium = filteredTasks.filter(
    (task) => !task.isPinned && task.priority === "medium",
  );

  const low = filteredTasks.filter(
    (task) => !task.isPinned && task.priority === "low",
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* NAVBAR */}
      <Navbar
        search={search}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        logout={logout}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* MAIN */}
      <main
        className={`p-6   md:p-8 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:ml-72" : "ml-0"
        }`}
      >
        <div className="mt-8">
          {/* TASK SECTION */}
          {activeSection === "tasks" && (
            <div className="space-y-12">
              {/* FILTER */}
              <FilterPanel filters={filters} setFilters={setFilters} />

              {/* CREATE */}
              <h1
                onClick={() => setCreateOpen(true)}
                className="flex cursor-pointer items-center w-40 gap-2 bg-sky-600 text-white px-4 py-2 rounded-xl"
              >
                <CreateTaskModal
                  open={createOpen}
                  onClose={() => setCreateOpen(false)}
                  onCreate={async (taskData) => {
                    await createTask(taskData);
                    await fetchTasks();
                  }}
                />
                <PlusIcon />
                Create Task
              </h1>

              {/* PINNED */}
              {pinned.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    📌 Pinned Tasks
                  </h2>

                  <TaskGrid
                    tasks={pinned}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                    onDelete={deleteTask}
                    onPin={pinTask}
                  />
                </section>
              )}

              {/* HIGH */}
              {high.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    🔥 High Priority
                  </h2>

                  <TaskGrid
                    tasks={high}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                    onDelete={deleteTask}
                    onPin={pinTask}
                  />
                </section>
              )}

              {/* MEDIUM */}
              {medium.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    ⚡ Medium Priority
                  </h2>

                  <TaskGrid
                    tasks={medium}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                    onDelete={deleteTask}
                    onPin={pinTask}
                  />
                </section>
              )}

              {/* LOW */}
              {low.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    🌱 Low Priority
                  </h2>

                  <TaskGrid
                    tasks={low}
                    onEdit={(task) => {
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                    onDelete={deleteTask}
                    onPin={pinTask}
                  />
                </section>
              )}

              {/* EMPTY STATE */}
              {filteredTasks.length === 0 && (
                <div className="text-center py-20">
                  <h2 className="text-3xl font-bold text-slate-500">
                    No Tasks Found
                  </h2>
                  <p className="mt-3 text-slate-400">
                    Try adjusting filters or create a new task.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* COMPLETED */}
          {activeSection === "completed" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow">
              <h1 className="text-3xl font-bold dark:text-white mb-6">
                ✅ Completed Tasks
              </h1>

              <TaskGrid
                tasks={tasks.filter((task) => task.status === "completed")}
                onEdit={(task) => {
                  setSelectedTask(task);
                  setModalOpen(true);
                }}
                onDelete={deleteTask}
                onPin={pinTask}
              />
            </div>
          )}

          {/* ACCOUNT */}
          {activeSection === "account" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow">
              <h1 className="text-3xl font-bold dark:text-white mb-6">
                👤 Account
              </h1>

              <Account />
            </div>
          )}

          {/* TRASH */}
          {activeSection === "trash" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow">
              <Trash />
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={async (updatedTask) => {
            await updateTask(selectedTask._id, updatedTask);
            await fetchTasks();
            setModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
