import { deleteUser, register } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";



export default function userRouter(router){
    router.post("/user/register", register);
    router.delete("/user/delete", authMiddleware, deleteUser)
}