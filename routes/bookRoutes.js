import express from 'express';
import {createBook, getBook, getBooks} from '../controllers/bookController.js';
import protect from "../middleware.js";

const router = express.Router();

router.route('/')
    .get(async (req, res) => getBooks(req, res))
    .post(protect,async (req, res) => createBook(req, res))

router.route('/:id')
    .get(async (req, res) => getBook(req, res))
    // .put(protect,async (req, res) => updateBook(req, res))
    // .delete(protect,async (req, res) => deleteBook(req, res))

export default router;
