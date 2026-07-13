const XUser = require("../models/xuser.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const XDeletedUser = require("../models/xDeletedUser.model")

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existUser = await XUser.findOne({ email })
        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await XUser.create({ username, email, password: hashedPassword })

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })

        return res.status(201).json({ message: "User created successfully", username: user.username, email: user.email, user_id: user._id })

    } catch (error) {
        res.status(500).json({ message: "Error in registering user" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await XUser.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const userDeleted = await XDeletedUser.findOne({ user: user._id })

        if (userDeleted) {
            return res.status(400).json({ message: "User is deleted, please recover your account within 7 days" })
        }

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })


        return res.status(200).json({ message: "User logged in successfully", username: user.username, email: user.email, user_id: user._id })

    } catch (error) {
        res.status(500).json({ message: "Error in logging in user" })
    }
}

const logoutUser = async (req, res) => {
    try {

        res.clearCookie("token")
        return res.status(200).json({ message: "User logged out successfully" })

    } catch (error) {
        console.log("Error in logging out user:", error)
        res.status(500).json({ message: "Error in logging out user" })
    }
}

const deleteUser = async (req, res) => {
    try {

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token not found" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await XUser.findById(decoded.user_id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const deletedUser = await XDeletedUser.create({ user: user._id })

        user.isDeleted = true
        user.deletedAt = new Date()
        await user.save()

        return res.status(200).json({ message: "User deleted successfully, If you want to recover your account just simply login using your credentials within 7 days of deletion", username: user.username, email: user.email })

    } catch (error) {
        res.status(500).json({ message: "Error in deleting user" })
    }
}

const restoreUser = async (req, res) => {
    try {
        const { email } = req.body

        const user = await XUser.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const deletedUser = await XDeletedUser.findOne({ user: user._id })
        if (!deletedUser) {
            return res.status(400).json({ message: "User is not deleted" })
        }

        user.isDeleted = false
        await user.save()
        await deletedUser.deleteOne()

        return res.status(200).json({ message: "User restored successfully", username: user.username, email: user.email })

    } catch (error) {
        res.status(500).json({ message: "Error in restoring user" })
    }
}

module.exports = { registerUser, loginUser, logoutUser, deleteUser, restoreUser, restoreUser }