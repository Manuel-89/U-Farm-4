const express = require('express');
const router = express.Router();
const passport = require('passport');

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
        res.redirect('/agriculturalOfficerDashboard')
    } else (
        res.send("Sorry, either your session has expired or you are not a registered user")
    )
    
});

router.post('/logout', (req,res) => {
     if(req.session) {
        req.session.destroy(function(error) {
            if (error){
                res.status(400).send("Unsuccessful logout")
            }
            else{
                return res.redirect('/login');
            }
     })
    }});


module.exports = router;

