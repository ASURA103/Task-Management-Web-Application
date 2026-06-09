import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTrashTasks,
  permanentDeleteTask,
  pinTask,
  restoreTask,
} from "../services/taskServices.js";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const [trashTasks, setTrashTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // GET ALL TASKS

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);

      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // CREATE TASK

  const handleCreateTask = async (taskData) => {
    const data = await createTask(taskData);

    await fetchTasks();

    return data;
  };

  // UPDATE TASK

  const handleUpdateTask = async (id, taskData) => {
    const data = await updateTask(id, taskData);

    await fetchTasks();

    return data;
  };

  // PIN / UNPIN

  const handlePinTask = async (id) => {
    const data = await pinTask(id);

    await fetchTasks();

    return data;
  };

  // SOFT DELETE

  const handleDeleteTask = async (id) => {
    const data = await deleteTask(id);

    await fetchTasks();

    return data;
  };

  // GET TRASH TASKS

  const fetchTrashTasks = async () => {
    try {
      const data = await getTrashTasks();

      setTrashTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };
  // RESTORE

  const handleRestoreTask = async (id) => {
    const data = await restoreTask(id);

    await fetchTasks();
    await fetchTrashTasks();

    return data;
  };

  // PERMANENT DELETE

  const handlePermanentDelete = async (id) => {
    const data = await permanentDeleteTask(id);

    await fetchTrashTasks();

    return data;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchTasks();
  }, []);

  return {
    // state
    tasks,
    trashTasks,
    loading,
    error,

    // setters
    setTasks,
    setTrashTasks,

    // fetch
    fetchTasks,
    fetchTrashTasks,

    // actions
    createTask: handleCreateTask,

    updateTask: handleUpdateTask,

    deleteTask: handleDeleteTask,

    pinTask: handlePinTask,

    restoreTask: handleRestoreTask,

    permanentDeleteTask: handlePermanentDelete,
  };
}
