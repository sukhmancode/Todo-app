import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

        return res.status(201).json({ token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error while signing up" });
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const newUser = await User.findOne({ email });
    if (!newUser) {
        return res.status(400).json({ message: "newUser not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, newUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ newUserId: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'yourSecretKey', { expiresIn: '1h' });

    return res.status(200).json({ token });
});

export default router;