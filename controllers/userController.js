import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const emailExists = await User.findOne({email});

        if (emailExists) return res.status(400).json({message: 'Email already exists'});


        const user = new User({username, email, password});

        if (user) {
            await user.save();
            return res.status(201).json({
                _id: user._id, username: user.username, email: user.email, token: generateToken(user._id),
            });
        }

        res.status(400).json({message: 'Invalid user data'});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error', err});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) return res.json({
            _id: user._id, username: user.username, email: user.email, token: generateToken(user._id),
        });

        res.status(401).json({message: 'Invalid email or password'});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

export const getBookmark = async (req,res) =>{
    const {id} = req.params;
    try {
        const user = await User.findById(id).populate('bookmarks')
        if (user){
            return res.status(200).json(user.bookmarks)
        }

        res.status(404).json({message: 'User not found'});
    }catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}

export const addBookmark = async (req, res) => {
    const { id, bookmark } = req.params;
    try {
        const user = await User.findById(id);

        if (user) {
            const bookmarkId = new mongoose.Types.ObjectId(bookmark);
            if (user.bookmarks.some((b) => b.equals(bookmarkId))) {
                user.bookmarks = user.bookmarks.filter((b) => !b.equals(bookmarkId));
                await user.save();
                return res.status(201).json({ message: 'Bookmark removed successfully' });
            }

            user.bookmarks.push(bookmarkId);
            await user.save();
            return res.json({ message: 'Bookmark added successfully' });
        }

        res.status(404).json({ message: 'User not found' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) return res.json({
            _id: user._id, username: user.username, email: user.email,bookmarks: user.bookmarks
        });

        res.status(404).json({message: 'User not found'});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};
