import Book from '../models/bookModel.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find({}).sort({createdAt: -1});
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, author, genre, description,price,image } = req.body;
        const newBook = new Book({ title, author, genre, description,price,image });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// export const updateBook = async (req, res) => {
//     try {
//         const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
//         res.status(200).json(updatedBook);
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
//
// export const deleteBook = async (req, res) => {
//     try {
//         const deletedBook = await Book.findByIdAndDelete({id: req.params.id});
//         if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
//         res.status(200).json({ message: 'Book deleted' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
