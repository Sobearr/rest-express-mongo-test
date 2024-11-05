import express from 'express';
import connectToDatabase from './config/dbConnect.js';
import livro from './models/Livro.js';

const connection = await connectToDatabase();

connection.on('error', (error) => {
    console.error('connection error', error);
});

connection.once('open', () => {
    console.log('DB connection successful.');
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.get('/livros', async (req, res) => {
    const livrosList= await livro.find({});
    res.status(200).json(livrosList);
});

app.get('/livros/:id', (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(livros[index]);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Book registered successfully.');
});

app.put('/livros/:id', (req, res) => {
    const index = searchBook(req.params.id);
    livros[index].title = req.body.title;
    res.status(200).json(livros);
});

app.delete('/livros/:id', (req, res) => {
    const index = searchBook(req.params.id);
    livros.splice(index, 1);
    res.status(200).send(`Book with id ${index + 1} removed successfully.`);
});

export default app;