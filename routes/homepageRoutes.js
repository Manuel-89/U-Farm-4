const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
    res.render("Homepage");
});

router.post('/home', (req,res) => {
    res.redirect("/home");
});


module.exports = router;

