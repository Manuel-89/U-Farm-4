const express = require('express');
const router = express.Router();
const multer = require('multer');
const connectEnsureLogin = require('connect-ensure-login');
// importing model
const Registration = require('../models/User');
const Produce = require('../models/Produce');
// upload images
var storage = multer.diskStorage({
    destination:(req, file, cb) =>{
    cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
    cb(null, file.originalname)
    }
});

// instantiate variable upload to store multer functionality to upload image
var upload = multer({ storage: storage })

router.get('/productUpload',async (req,res) =>{
    let urbanFarmerList = await Registration.find({role: "urbanFarmer"});
    res.render("productUploadForm", {urbanFarmers: urbanFarmerList});
     try {
        
     } catch (error) {
        
     }
});
// router.post('/productUpload', (req,res) => {
//     console.log(req.body)
//     res.redirect('/productUpload')
// })

// router.get('/productUpload', connectEnsureLogin.ensureLoggedIn(), (req,res)=> {
//     console.log("This is the current user", req.session.user);
//     res.render("productUploadForm", {currentUser:req.session.user});
// });
// router.post('/productUpload', connectEnsureLogin.ensureLoggedIn(),upload.single('productImage'), async (req,res) =>{
//     console.log(req.body);
//     try {
//         const produce = new Produce(req.body);
//         produce.productImage = req.file.path
//         await produce.save();
//         res.redirect('/productUpload');
//         }
//     catch (error) {
//         res.status(400).send("Sorry,the upload was unsuccessful");
//         console.log(error);
//     }
    
// });


// router.get('/productUpload',async (req,res) =>{
//     let urbanFarmerList = await Registration.find({role: "urbanFarmer"});
//     res.render("productUploadForm", {urbanFarmers: urbanFarmerList});
//      try {
        
//      } catch (error) {
        
//      }
// });
// router.post('/productUpload', (req,res) => {
//     console.log(req.body)
//     res.redirect('/productUpload')
// })

// router.get('/productUpload', (req,res)=> {
//     res.render("productUploadForm");
// })
router.post('/productUpload',upload.single('productImage'), async (req,res) =>{
    console.log(req.body);
    try {
        const produce = new Produce (req.body);
        produce.productImage = req.file.path
        await produce.save();
         res.redirect('/productUpload');
        }
    catch (error) {
        res.status(400).send("Sorry,the upload was unsuccessful");
        console.log(error);
    }
    
});


// Fetching all products
router.get('/produceList', async (req,res) => {
    try {
        let products = await Produce.find();
        res.render("produceList", {products:products});    
    } catch (error) {
        res.status(400).send("Unable to get product list");
    }
    
})

// updating produce 
router.get('/produce/update/:id', async (req,res) =>{
    try {
        const updateProduct = await Produce.findOne({_id:req.params.id});
        res.render('produceUpdate', {product:productUpdate});
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})
router.get('/produce/update/', async (req,res) =>{
    try {
        await Produce.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('back');
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})
// delete product
router.post('/produce/delete', async (req,res) => {
    try {
        await Produce.deleteOne({_id:req.body.id});
        res.redirect('back');    
    } catch (error) {
        res.status(400).send("product could not be deleted");
    }
    
})

router.post('/produceList', (req,res) => {
    console.log(req.body)
    res.redirect("/produceList")
})





// Viewing product page in UI
router.get('/products', (req,res) => {
    res.render("Products")
});

router.post('/products', (req,res) => {
    console.log(req.body)
});

module.exports = router;