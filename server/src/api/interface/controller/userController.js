import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../config/schema/userSchema.js";
import { registerValidator, editValidator, loginValidator } from "../../config/validators/validators.js";
import env from "../../../infrastructure/env.js";

// ---------------- REGISTER USER ----------------
export const register = async (req, res) => {
  const body = req.body;

  try {
    const result = registerValidator.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }

    const userExist = await User.findOne({ email: body.email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword =await bcrypt.hash(body.password, salt);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, env.JWT_KEY, { expiresIn: "1d" });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- LOGIN USER ----------------
export const login = async (req, res) => {
  const body = req.body;

  try {
      const result = loginValidator.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const pass = await bcrypt.compare(body.password, user.password);

    if (!pass) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, env.JWT_KEY, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ---------------- EDIT USER ----------------
export const editUser = async (req, res) => {
  const body = req.body;
  const userId = req.userId;

  try {
    const result = editValidator.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.errors.map((e) => e.message),
      });
    }

    let updateData = {};

    if (body.name) {
      updateData.name = body.name;
    }

    if (body.password) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = await bcrypt.hash(body.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// ---------------- DELETE USER ----------------
export const deleteUser = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: "User deleted successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


