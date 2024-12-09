const express = require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to mongodb and //listen for requests

const dbURI = 'mongodb+srv://finnbangla:1234@nodejs-learning.3zjgw.mongodb.net/nodejs-learning?retryWrites=true&w=majority&appName=Nodejs-learning';
mongoose.connect(dbURI)
   .then((result) => app.listen(3000))
   .catch((err) => console.log (err));


//register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
   res.redirect('/blogs');
 });
 
 app.get('/about', (req, res) => {
   res.render('about', { title: 'About' });
 });
 

 //blog routes
app.use('/blogs', blogRoutes); //by adding '/blogs', we have scoped our route for homepage


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});