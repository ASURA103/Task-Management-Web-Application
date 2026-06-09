import {
  createTask,
  deleteTask,
  getTasks,
  getTrashTasks,
  permanentDeleteTask,
  restoreTask,
  togglePinTask,
  updateTask,
} from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

export default function taskRouter(router) {
  router.post("/task/create", authMiddleware, createTask);
  router.get("/task/get", authMiddleware, getTasks);
  router.put("/task/update/:id", authMiddleware, updateTask);
  router.patch("/task/pin/:id", authMiddleware, togglePinTask);
  router.delete("/task/delete/:id", authMiddleware, deleteTask);
  router.get("/task/trash", authMiddleware, getTrashTasks);
  router.patch("/task/restore/:id", authMiddleware, restoreTask);
  router.delete("/task/force/:id", authMiddleware, permanentDeleteTask);
}
