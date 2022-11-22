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

router.get('/productUpload', connectEnsureLogin.ensureLoggedIn(), (req,res)=> {
    console.log("This is the current user", req.session.user);
    res.render("productUploadForm", {currentUser:req.session.user});
});
router.post('/productUpload', connectEnsureLogin.ensureLoggedIn(),upload.single('productImage'), async (req,res) =>{
    console.log(req.body);
    try {
        const produce = new Produce(req.body);
        produce.productImage = req.file.path
        await produce.save();
        res.redirect('/productUpload');
        }
    catch (error) {
        res.status(400).send("Sorry,the upload was unsuccessful");
        console.log(error);
    }
    
});


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
// router.post('/productUpload',upload.single('productImage'), async (req,res) =>{
//     console.log(req.body);
//     try {
//         const produce = new Produce (req.body);
//         produce.productImage = req.file.path
//         await produce.save();
//          res.redirect('/productUpload');
//         }
//     catch (error) {
//         res.status(400).send("Sorry,the upload was unsuccessful");
//         console.log(error);
//     }
    
// });


// Fetching all products
router.get('/produceList', async (req,res) => {
    try {
        const sort = { _id: -1 };
        let products = await Produce.find().sort({$natural: -1});
        res.render("produceList", {products:products});    
    } catch (error) {
        res.status(400).send("Unable to get product list");
    }
    
})

// updating produce 
router.get('/produce/update/:id', async (req,res) =>{
    try {  
        const updateProduct = await Produce.findOne({_id:req.params.id});
        res.render('productUpdate', {product:updateProduct});
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})
router.post('/produce/update/', async (req,res) =>{
    try {
        await Produce.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/produceList');
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
});

// approving produce 
router.get('/produce/approve/:id', async (req,res) =>{
    try {
        const approveProduct = await Produce.findOne({_id:req.params.id});
        res.render('productApproval', {product:approveProduct});
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})
router.post('/produce/approve/', async (req,res) =>{
    try {
        await Produce.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/produceList');
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})

// Availaility of  produce 
router.get('/produce/available/:id', async (req,res) =>{
    try {
        const sellProduct = await Produce.findOne({_id:req.params.id});
        res.render('productAvailable', {product:sellProduct});
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})
router.post('/produce/available/', async (req,res) =>{
    try {
        await Produce.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/approvedProduceList');
    } catch (error) {
        res.status(400).send('unable to view produce list');
    }

})

router.get('/approvedProduceList', async (req,res) => {
    try {
        let products = await Produce.find().sort({$natural:-1});
        res.render('approvedProduceList',{products:products});
    } catch (error) {
     res.status(400).send("Sorry there is no approved list")    
    }
    
})

//Order get and post Routes start here 
router.get("/produce/order/:id", async (req, res) => {
	try {
		const ordering = await Produce.findOne({ _id: req.params.id });
		res.render("productOrder", { orderProd: ordering });
		console.log('Order product',ordering)
	} catch (error) {
		res.status(400).send("Can't order product");
	}
});

router.post("/produce/order", async (req, res) => {
	try {
		await Produce.findOneAndUpdate({ _id: req.query.id }, req.body);
		res.redirect("/approvedProduceList");
	} catch (error) {
		res.status(400).send("Unable to find produce");
	}
});

// Return Order list
router.get("/orders", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
	try {
		let ordered = await Produce.find({ role: "Urban Farmer" });
		res.render("bookedProducts", { orderedGoods:ordered });
	} catch (error) {
		res.status(400).send("No product booked yet!");
	}
});



// Viewing product page in UI
router.get('/products', (req,res) => {
    res.render("Products")
});

router.post('/products', (req,res) => {
    console.log(req.body)
});

module.exports = router;