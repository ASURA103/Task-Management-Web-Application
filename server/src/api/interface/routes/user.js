import {
  register,
  login,
  editUser,
  deleteUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

export default function userRouter(router) {
  router.post("/user/register", register);
  router.post("/user/login", login);
  router.put("/user/update", authMiddleware, editUser);
  router.delete("/user/delete", authMiddleware, deleteUser);
}
