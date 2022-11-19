const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registraion = require('../models/User');
const Produce = require('../models/Produce');


// Urban Farmer Dashboard
router.get('/urbanFarmerDashboard',connectEnsureLogin.ensureLoggedIn(), (req,res) =>{
    req.session.user = req.user;
    if (req.user.role === "urbanFarmer"){
       res.render("urbanFarmerDashboard");
    } else {
       res.send("This page is accessed by only the Urban Farmer");
    }
    
});


module.exports = router;

