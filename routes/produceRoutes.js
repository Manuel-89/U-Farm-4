// const { Router } = require('express');
const express = require('express');
const router = express.Router();

// importing model
const Produce = require('../models/Produce')


router.get('/produce', (req,res) =>{
     res.render("productUploadForm");
});
router.post('/produce', (req,res) =>{
    console.log("req.body");
    res.send('Product uploaded successfully');
    // res.redirect('/');
});

module.exports = router;

