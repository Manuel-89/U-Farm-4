const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registraion = require('../models/User');

router.get('/', (req, res) => {
    res.render("Homepage");
});

router.post('/home', (req,res) => {
    res.redirect("/home");
});


module.exports = router;

