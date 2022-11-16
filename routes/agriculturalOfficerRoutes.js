
const express = require('express');
const router = express.Router();

// Agricultural officer Dashboard
router.get('/farmerOneDashboard', (req,res) =>{
     res.render("agriCOfficerDashboard");
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

