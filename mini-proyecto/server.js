const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs.create({ defaultLayout: 'main' }).engine);
app.set('view engine', 'handlebars');

const users = [{ username: 'Mario', password: 'P308' }];
let comments = [];

app.get('/', (req, res) => {
  res.render('login', { title: 'Inicio de Sesión', layout: false });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.locals.username = username;
    res.render('comments', { title: 'Comentarios', username, comments });
  } else {
    res.send('Inicio de sesión fallido. Inténtelo de nuevo.');
  }
});

app.get('/write-comment', (req, res) => {
  res.render('writeComment', { title: 'Escribir Comentario', username: res.locals.username });
});

app.post('/post-comment', (req, res) => {
  const { comment } = req.body;
  comments.push(comment);
  res.redirect('/comments');
});

app.get('/comments', (req, res) => {
  res.render('comments', { title: 'Comentarios', username: res.locals.username, comments });
});

app.get('/logout', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
