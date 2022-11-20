
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registraion= require('../models/User');
const Produce = require('../models/Produce');

// General User Dashboard
router.get('/generalUserDashboard',connectEnsureLogin.ensureLoggedIn(), (req,res) =>{
     req.session.user = req.user;
     if (req.user.role === "generalUser"){
        res.render("generalUserDashboard");
     } else {
        res.send("This page is accessed by only the registered user");
     }
     
});


module.exports = router;

