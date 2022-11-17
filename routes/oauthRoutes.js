const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render("Account");
});

router.post('/login', passport.authenticate("local", { failureRedirect: "/login"}), (req,res) => {
    res.redirect("/register");
});

router.post('/logout', (req,res) => {
     if(req.session) {
        req.session.destroy(function(error) {
            if (error){
                res.status(400).send("Unable to logout")
            }
            else{
                return res.redirect('/login');
            }
     })
    }});


module.exports = router;

