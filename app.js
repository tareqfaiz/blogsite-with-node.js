const express = require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config(); // Import dotenv to load variables from the .env file

//express app
const app = express();

//connect to mongodb and listen for requests

const dbURI = process.env.MONGO_URI; // Use the environment variable
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