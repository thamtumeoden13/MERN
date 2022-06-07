import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from "../models/userModel.js";

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await UserModel.findOne({ email })

        if (!existingUser) return res.status(200).json({ result: null, message: "Tài khoản không tồn tại." })

        const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(200).json({result: null, message: 'Mật khẩu chưa chính xác' })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, level: existingUser.level }, 'test', { expiresIn: "24h" })

        res.status(200).json({ result: existingUser, token, message: '' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) return res.status(200).json({ message: "Tài khoản đã tồn tại" })

        if (password !== confirmPassword) return res.status(200).json({ message: "Mật khẩu chưa chính xác" })

        const hashedPassword = await bcryptjs.hash(password, 12)

        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "24h" })

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}