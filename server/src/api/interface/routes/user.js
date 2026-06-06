import { register } from "../controller/userController.js";



export default function userRouter(router){
    router.post("/user/register", register);
}