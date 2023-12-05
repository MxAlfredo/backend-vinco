const fs = require('fs');

const FILE_PATH = 'books.json';

const readBooks = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

const saveBooks = (books) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(books, null, 2), 'utf-8');
};

const getBooks = () => {
    return readBooks();
};

const getBookById = (id) => {
    const books = readBooks();
    return books.find((book) => book.id === id);
}

const createBook = (book) => {
    const books = readBooks();
    const lastId = books.length > 0 ? books[books.length - 1].id : 0;
    const newBook = { ...book, id: lastId + 1 };
    books.push(newBook);
    saveBooks(books);
    return newBook;
};

const updateBook = (id, updatedBook) => {
    const books = readBooks();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex] = {...updatedBook, id};
        saveBooks(books);
        return updatedBook;
    }
    return null;
}

const deleteBook = (id) => {
    const books = readBooks();
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex !== -1) {
        const deletedBook = books[bookIndex];
        books.splice(bookIndex, 1);
        saveBooks(books);
        return deletedBook;
    }
    return null;
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBookById
};
