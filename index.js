const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use('/api/books', booksRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
