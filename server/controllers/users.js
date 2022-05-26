import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from "../models/userModel.js";

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await UserModel.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User Doesn't exist." })

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, level: existingUser.level }, 'test', { expiresIn: "24h" })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exists." })

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." })

        const hashedPassword = await bcryptjs.hash(password, 12)

        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "24h" })

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}