import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../config/schema/userSchema.js";
import { registerValidator } from "../../config/validators/validators.js";
import env from "../../../infrastructure/env.js";
import { id } from "zod/v4/locales";

// -------------------- REGISTER USER ---------------------

export const register = async (req, res)=>{
    const body = req.body;
    console.log(body)
    try {

        //VALIDATION
        const result = registerValidator.safeParse(body);
        if(!result.success){
            return res.status(400).json({
                message: result.error.errors.map((e)=> e.message),
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

        const token =jwt.sign({ id: user._id},env.JWT_KEY, {expiresIn: "1d"})

        res.status(201).json({
            message: "User registered successfully",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
            
        });
    } catch (error) {
       console.log("error while registering ", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
 
    })}
}

//-------------------- LOGIN USER ------------------------

export const login = async(req, res)=>{
    const body = req.body
try {
    const user = await User.findOne({email: body.email});

    if (!user){
        return res.status(404).json({
            message: " User not found "
        });
    }
     const pass = await bcrypt.compare(body.password, user.password);

     if (!pass){
        return res.status(401).json({
            message: "Incorrect Password !"
        })
     }
     const token = jwt.sign(
        {id: user._id},
        env.JWT_KEY,
        { expiresIn: "1d" }
     )
     return res.status(200).json({
        message: "Login successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
     })


} catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });

    
}

}


export const deleteUser = async(req, res)=>{
     const userId = req.userId;
    try {

        const user = await User.findById(userId)
        
        if (!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        
        await User.findByIdAndDelete(userId)
        return res.status(200).json({
            message: "User account deleted successfully",
            name: user.name,
            email: user.email
        })
    } catch (error) {
         return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
    }

}






