// const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get('/register', (req,res) =>{
     res.render("urbanFarmerRegistration");
});
router.post('/register', (req,res) =>{
    console.log("req.body");
    res.send('User registered successfully');
    // res.redirect('/');
});

module.exports = router;

