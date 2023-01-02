const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('Middleware 1');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Middleware 2');
//   res.send('<h1>Response in middleware 2</h1>');
// });

app.use('/users', (req, res, next) => {
  console.log('/users middleware');
  res.send('<h1>The middleware handle /users</h1>');
});

app.use('/', (req, res, next) => {
  console.log('/ middleware');
  res.send('<h1>The middleware handle /</h1>');
});

app.listen(8080, () => {
  console.log('assignment 2');
});
