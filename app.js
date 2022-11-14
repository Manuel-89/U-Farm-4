// Dependencies
const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/db');
// const port = process.env.port || 4000
const expressSession = require('express-session')({
  secret: 'secret',
  resave: 'false',
  saveUninitialized: false,
});
  
// Importing Route files
const registrationRoutes = require('./routes/registerRoutes');


// // Instantiations
const app = express();


// Setup Database Connections
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once('open', function(){
 console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(err){
  console.error(err);
});


// Configurations
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

// MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(expressSession);
// app.use(express.urlencoded({extended:true}));
// app.use('expressSession',({
//   secret: 's0Ug@2022',
//   resave:false,
//   saveUninitialized: true,
//   cookie: {secure: true}
// }) );

// // Passport Config & Middleware
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/user', registrationRoutes)


// app.get('/', (req, res) => { 
//   res.render('Homepage');
// });
// app.post('/', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/login', (req, res) => { 
//   res.render('Account');
// });
// app.post('/login', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/productupload', (req, res) => {
//   res.render('productUploadForm');
// });
// app.post('/productupload', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/urbanFarmerReg', (req, res) => {
//   res.render('urbanFarmerRegistration');
// });
// app.post('/urbanFarmerReg', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/farmerOneReg', (req, res) => {
//   res.render('farmerOneRegistration');
// });
// app.post('/farmerOneReg', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/products', (req, res) => {
//   res.render('Products');
// });
// app.post('/products', (req,res)=>{
//   console.log(req.body);
//   res.redirect('/');
// });

// app.get('/productupload', (req, res) => {
//   res.sendFile(__dirname + '/Views/productUploadForm.pug');
// });

// app.post ('/productupload', (req,res) => {
//   console.log(req.body);
//   res.redirect('/');
// })


// app.use((req,res,next) => {
//   console.log ("A new request received at " + Date.now());
//   next();
// });


// For invalid routes
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

app.listen(3000, () => console.log('listening on port 3000'));