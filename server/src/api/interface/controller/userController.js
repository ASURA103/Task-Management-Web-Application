import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../config/schema/userSchema.js";
import { registerValidator } from "../../config/validators/validators.js";
import env from "../../../infrastructure/env.js";

// -------------------- REGISTER USER ---------------------

export const register = async (req, res)=>{
    const body = req.body;
    console.log(body)
    try {

        //VALIDATION
        const result = registerValidator.safeParse(body);
        if(!result.success){
            return res.status(400).json({
                message: result.error.errors.mao((e)=> e.message),
            })
        } 

        const {name, email, password } = req.body;

        const userExist = await User.findOne({email: body.email});
            // CHEKING IF USER ALREADY EXISTS
        if(userExist){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // HASHING PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(body.password, salt);

        //CREATING USER
        const user = await User.create({
            name: body.name,
            email: body.email,
            password: hashPassword
        });

        const token =jwt.sign({ id: user._id},env.JWT_KEY, {expiresIn: "id"})

        res.status(201).json({
            message: "User registered successfully",
            token,
            user:{
                name: user.name,
                email: user.email,
                token: token
            }
        });
    } catch (error) {
       console.log("error while registering ", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
 
    })}
}