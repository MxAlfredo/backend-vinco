const booksModel = require('../models/booksModel');
const booksValidations = require('../validations/booksValidations');

const getBooks = (req, res) => {
    try {
        const books = booksModel.getBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
};

const getBookById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = booksModel.getBookById(id);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
}


const createBook = (req, res) => {
    try {
        const newBook = req.body;
        const { error } = booksValidations.bookValidation(newBook);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const book = booksModel.createBook(newBook);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el libro' });
    }
};

const updateBook = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedBook = req.body;
        const { error } = booksValidations.bookValidation(updatedBook);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const book = booksModel.updateBook(id, updatedBook);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
};

const deleteBook = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const book = booksModel.deleteBook(id);
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById
};
