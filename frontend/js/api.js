const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());

let livros = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, preco: 29.90, categoria: "Clássico", vendedor: "João Silva", imagem: "/frontend/img/book.png" },
  { id: 2, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, preco: 19.90, categoria: "Infantil", vendedor: "Maria Oliveira", imagem: "/frontend/img/book.png" },
  { id: 3, titulo: "A Revolução dos Bichos", autor: "George Orwell", ano: 1945, preco: 24.90, categoria: "Política", vendedor: "Carlos Souza", imagem: "/frontend/img/book.png" },
  { id: 4, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967, preco: 34.90, categoria: "Ficção", vendedor: "Ana Costa", imagem: "/frontend/img/book.png" },
  { id: 5, titulo: "1984", autor: "George Orwell", ano: 1949, preco: 28.90, categoria: "Distopia", vendedor: "Lucas Almeida", imagem: "/frontend/img/book.png" },
  { id: 6, titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937, preco: 39.90, categoria: "Fantasia", vendedor: "Julia Pereira", imagem: "/frontend/img/book.png" },
  { id: 7, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, preco: 59.90, categoria: "Fantasia", vendedor: "Marcos Oliveira", imagem: "/frontend/img/book.png" },
  { id: 8, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, preco: 44.90, categoria: "Fantasia", vendedor: "Fernanda Gomes", imagem: "/frontend/img/book.png" },
  { id: 9, titulo: "O Alquimista", autor: "Paulo Coelho", ano: 1988, preco: 22.90, categoria: "Filosofia", vendedor: "Ricardo Santos", imagem: "/frontend/img/book.png" },
  { id: 10, titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", ano: 2005, preco: 31.90, categoria: "Drama", vendedor: "Sofia Rodrigues", imagem: "/frontend/img/book.png" }
];

app.get('/livros', (req, res) => {
  res.json(livros);
});


app.get('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  res.json(livro);
});


app.post('/livros', (req, res) => {
  const novoLivro = {
    id: livros.length + 1,
    titulo: req.body.titulo,
    autor: req.body.autor,
    ano: req.body.ano
  };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});


app.put('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

  livro.titulo = req.body.titulo;
  livro.autor = req.body.autor;
  livro.ano = req.body.ano;
  res.json(livro);
});

app.delete('/livros/:id', (req, res) => {
  livros = livros.filter(l => l.id !== parseInt(req.params.id));
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`API de livros rodando em http://localhost:${port}`);
});
module.exports = "http://localhost:3000/livros";