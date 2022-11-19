
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registraion = require('../models/User');
const Produce = require('../models/Produce');

// Agricultural officer Dashboard
router.get('/AgricOfficerDashboard',connectEnsureLogin.ensureLoggedIn(), (req,res) =>{
     req.session.user = req.user;
     if (req.user.role === "agricultural Officer"){
        res.render("agriculturalOfficerDashboard");
     } else {
        res.send("This page is accessed by only the Agricultural Officer");
     }
     
});

// Farner One list
router.get('/farmerOneList', (req,res) =>{
    res.render("farmerOneAccountList");
});

// Farmer One Activities
router.get('/farmerOneActivities', (req,res) => {
    res.render('farmerOneActivities')
});

// Ward
router.get('/wards', (req,res) => {
    res.render('wardList');
});

// 
router.get('/generalUser', (req,res) => {
    res.render('wardList');
});


module.exports = router;

