const express = require('express');
const router = express.Router();
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// importing model
const produceUpload = require('../models/Produce')
const Registration = require('../models/User');
// upload images
var storage = multer.diskStorage({
    destination:(req, file, cb) =>{
    cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
    cb(null, file.originalname)
    }
});

// instantiate variable upload to store multer functionality to upload image
var upload = multer({storage: storage})

// router.get('/produceUpload',async (req,res) =>{
//     let UrbanFarmerList = await Registration.find({role: "urbanFarmer"});
//     res.render("productUploadForm", {urbanFarmers: UrbanFarmerList});
//      try {
        
//      } catch (error) {
        
//      }
// });
router.get('/produceUpload', connectEnsureLogin.ensureLoggedIn(), (req,res)=> {
    res.render("productUploadForm", {currentUser:req.session.user});
})
router.post('/produceUpload', connectEnsureLogin.ensureLoggedIn(),upload.single('productImage'), async (req,res) =>{
    console.log(req.body);
    try {
        const produce = new produceUpload(req.body);
        produce.productImage = req.file.path
        await produceUpload.save();
        // user, req.body.password, (error) => {
        //     if(error) {
        //         throw error
        //     }
         res.redirect('/Products');
        }
    catch (error) {
        res.status(400).send("Sorry,the upload was unsuccessful");
        console.log(error);
    }
    
});

module.exports = router;

