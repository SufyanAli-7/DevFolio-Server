import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({success: false,  message: 'All fields are required' });
        }   
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        return res.status(201).json({success: true, message: 'User registered successfully'});

    } catch (error) {
        console.error('Error during registration:', error.message);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}   

export const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message: 'All fields are required'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: 'Invalid email or password'});
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        return res.status(200).json({success: true, message: 'User logged in successfully'});  

    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}   

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({success: true, message: 'Logout Successful'});
    }
    catch (error) {
        console.error('Error during logout:', error.message);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}