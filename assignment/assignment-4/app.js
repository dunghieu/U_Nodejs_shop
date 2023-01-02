const path = require('path');

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const myRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(myRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
  });
});

app.listen(8080, () => {
  console.log('NodeJS app is running on port 8080');
});
