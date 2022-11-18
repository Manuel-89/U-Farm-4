
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
router.get('/generalUser', (req,res) => {
    res.render('wardList');
});

// 
router.get('/registerFarmerOne', (req,res) => {
    res.render('farmerOneRegistration')
});
router.post('/registerFarmerOne', (req,res) => {
    console.log(req.body);
}); 
// farmerOneDashboard


module.exports = router;

