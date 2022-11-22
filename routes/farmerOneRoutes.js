
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registration = require('../models/User');
const Produce = require('../models/Produce');


// Farmer One Dashboard
router.get('/farmerOneDashboard',connectEnsureLogin.ensureLoggedIn(), (req,res) =>{
    req.session.user = req.user;
    if (req.user.role === "farmerOne"){
       res.render("farmerOneDashboard");
    } else {
       res.send("This page is accessed by only the Farmer One");
    }
    
});

router.get('/urbanFarmerList', async (req,res) => {
    try {
        let urbanFarmers = await Registration.find({role: 'urbanFarmer'});
        res.render("urbanFarmerList", {urbanfarmers:urbanFarmers});    
    } catch (error) {
        res.status(400).send("Unable to get farmer One list");
    }
    
});


// // Ward
// router.get('/generalUser', (req,res) => {
//     res.render('wardList');
// });

// // 
// router.get('/registerFarmerOne', (req,res) => {
//     res.render('farmerOneRegistration')
// });
// router.post('/registerFarmerOne', (req,res) => {
//     console.log(req.body);
// }); 

module.exports = router;

