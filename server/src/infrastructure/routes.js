import express from "express";
import userRouter from "../api/interface/routes/user.js";
import taskRouter from "../api/interface/routes/task.js";

export default function createRouter() {
  const router = express.Router();

  userRouter(router);
  taskRouter(router);

  return router;
}
