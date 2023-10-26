const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000


// menggunakan ejs
app.set('view engine', 'ejs');

app.use(expressLayouts);

// Built-in Middleware
app.use(express.static('public'))

// Third Party Middleware
app.use(morgan('dev'));

// application level middleware - harus dituliskan diatas
app.use((req, res, next) => {
  console.log('Time : ' , Date.now())
  next();
});


app.get('/', (req, res) => {

  const mahasiswa = [
    {
      nama: 'wahyu',
      alamat: 'Banjarbaru'
    },
    {
      nama: 'Saif',
      alamat: 'Banjarbaru'
    },
    {
      nama: 'Bayu',
      alamat: 'Banjar,asin'
    }
  ];

  res.render('index', {
    nama: 'Muhammad Syaifuddin',
    layout: 'layouts/main',
    title: 'Halaman Home',
    mahasiswa
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main',
    title: 'Halaman About'});
})

app.get('/contact', (req, res) => {
  res.render('contact' , {
    layout: 'layouts/main',
    title: 'Halaman Contact'});
})

app.get('/product/:id', (req,res) => {
  res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
})


// harus ditulis paling bawah
app.use('/', (req, res) => {
  res.status(404)
  res.send('<h1>404</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





