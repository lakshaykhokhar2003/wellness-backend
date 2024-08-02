import express from "express";
import {addBookmark, getBookmark, getUserProfile, loginUser, registerUser} from '../controllers/userController.js';
import protect from "../middleware.js";

const router = express.Router();

router.get('/users/:id',async (req, res) => getUserProfile(req, res));

router.get('/users/:id/bookmark',async (req, res) => getBookmark(req, res));

router.post(`/users/:id/bookmark/:bookmark`,protect,async (req, res) => addBookmark(req, res));

router.post('/login', async (req, res) => loginUser(req, res));

router.post('/register', async (req, res) => registerUser(req, res));



export default router;
