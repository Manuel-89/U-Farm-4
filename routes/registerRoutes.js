// const { Router } = require('express');
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Importing model
const Registration = require('../models/User')

router.get('/register', (req,res) =>{
     res.render("generalUserRegistration");
});
router.post('/register', async (req,res) =>{
    console.log("req.body");
    try { 
        const user = new Registration(req.body);
        let UniqueExist = await Registration.findOne({uniqueId:req.body.uniqueId});
        if(UniqueExist) {
            return res.status(400).send("Sorry this uniqueId is already taken")
        }
        else {
            await Registration.register(user, req.body.password, (error) => {
                if (error){
                    throw error
                } res.redirect ('/login')
            });
           
        }
        
    } catch (error) {
        res.status('400').send('Sorry, an error occurred.');
        console.log(error);
    }
    //res.send ('User registered successfully');
    // // res.redirect('/');
});
router.get('/generalUser', (req,res) => {
    res.render('generalUserRegistration')
});
router.post('/generalUser', (req,res) => {
    console.log(req.body);
    res.redirect('/login');
});
router.get('/registerFarmerOne', (req,res) => {
    res.render('farmerOneRegistration')
});
router.post('/registerFarmerOne', (req,res) => {
    console.log(req.body);
    res.redirect('/login');
}); 
router.get('/registerAgricOfficer', (req,res) => {
    res.render('agriculturalOfficerRegistration')
});
router.post('/registerAgricOfficer', (req,res) => {
    console.log(req.body);
    res.redirect('/login');
}); 

router.get('/registerUrbanFarmer', (req,res) => {
    res.render('urbanFarmerRegistration')
});
router.post('/registerAgricOfficer', (req,res) => {
    console.log(req.body);
    res.redirect('/login');
}); 


module.exports = router;

