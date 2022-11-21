const express = require('express');
const router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registration = require('../models/User');

router.get('/login', (req, res) => {
    res.render("Account");
});

router.post('/login', passport.authenticate("local", { failureRedirect: "/login"}), (req,res) => {
    console.log("This is the current user", req.session.user);
    if (req.user.role == "urbanFarmer"){
        res.redirect('/urbanFarmerDashboard')
    } else if (req.user.role == "farmerOne"){
        res.redirect('/farmerOneDashboard')
    } else if (req.user.role == "agriculturalOfficer"){
        res.redirect('/agricOfficerDashboard')
    } else if (req.user.role == "generalUser"){
        res.redirect('/generalUserDashboard')
    }
    else (
        res.send("Sorry, either your session has expired or you are not a registered user")
    )
    
});


router.post('/login', passport.authenticate("local",{failureRedirect:"/login"}),(req,res) => {
     req.session.user = req.user;
     console.log("This is the user", req.session.user),
     res.redirect('/login');
    
     });


module.exports = router;

