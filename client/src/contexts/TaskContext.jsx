import { createContext, useContext } from "react";
import useTasks from "../hooks/useTasks.js";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={taskData}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used inside TaskProvider");
  }

  return context;
};
