import bcrypt from "bcrypt";
import { createUser, findByUsername } from "../models/userModels.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const existingUser = await findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);

    res.status(201).json({
      message: "User registered",
      user: { id: newUser.id, name: newUser.username },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsername(username);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login Succesful",
      user: {
        id: user.id,
        username: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    res.json(500).json({ message: "Server error" });
  }
};
