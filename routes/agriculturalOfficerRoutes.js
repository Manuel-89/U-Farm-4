
const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

// Import User Model
const Registraion= require('../models/User');
const Produce = require('../models/Produce');

// Agricultural officer Dashboard
router.get('/agricOfficerDashboard',connectEnsureLogin.ensureLoggedIn(), (req,res) =>{
     req.session.user = req.user;
     if (req.user.role === "agriculturalOfficer"){
        res.render("agriculturalOfficerDashboard");
     } else {
        res.send("This page is accessed by only the Agricultural Officer");
     }
     
});

// router.get("/reports", connectEnsureLogin.ensureLoggedIn(), (req,res) => {
//     req.session.user = req.user;
//     if(req.user.role == "agriculturalOfficer"){
//         try {
//             let totalPoultry = await Produce.aggregate([
//             {$match: {prodcategory: "poultry"}},
//             {$group: {id: "$prodname",
//              totalQuantity: {$sum: "$quantity"},
//              totalCost: {$sum: {$multiply: ["unitprice", "quantity"]}},
//              }}
//              ])    
//       res.render("reports", {
//                 title:  Reports
//                 totalP: Poultry[0]      
//                 totalH: Horticulture[0]
//                 totalD: totalDairy[0]
//                 });                           
// 
//         } catch (error) {
//                res.status(400).send("unable to find items in the database");
//         }
//     } else {
//             res.send("This page is only accessed by Agric Officers")
// }
// })

router.get('/farmerOneList', async (req,res) => {
    try {
        const sort = { _id: -1 };
        let farmerOnes = await Registraion.find().sort({$natural: -1});
        res.render("farmerOneList", {farmerOnes:farmerOnes});    
    } catch (error) {
        res.status(400).send("Unable to get farmer One list");
    }
    
});

// approving farmerOnes 
router.get('/farmerOne/approve/:id', async (req,res) =>{
    try {
        const approveFarmerOne = await Registration.findOne({_id:req.params.id});
        res.render('farmerOneApproval', {farmerOne:approveFarmerOne});
    } catch (error) {
        res.status(400).send('unable to update farmerOnes');
    }

})

router.post('/farmerOne/approve/', async (req,res) =>{
    try {
        await Registration.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/farmerOneList');
    } catch (error) {
        res.status(400).send('unable to update farmerOnes');
    }

});

// updating farmerOnes 
router.get('/farmeOne/update/:id', async (req,res) =>{
    try {  
        const updatefarmerOne = await Registraion.findOne({_id:req.params.id});
        res.render('farmerOneUpdate', {farmerOne:updatefarmerOne});
    } catch (error) {
        res.status(400).send('unable to update farmerOneList');
    }

});

router.post('/farmerOne/update/', async (req,res) =>{
    try {
        await Registraion.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/farmerOneList');
    } catch (error) {
        res.status(400).send('unable to update farmerOne');
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

});

router.post('/produce/update/', async (req,res) =>{
    try {
        await Produce.findOneAndUpdate({_id:req.query.id}, req.body);
        res.redirect('/produceList');
    } catch (error) {
        res.status(400).send('unable to update produce');
    }

})

// Farmer One Activities
router.get('/farmerOneActivities', async (req,res) => {
    try {
        const sort = { _id: -1 };
        let farmerOnes = await Registraion.find().sort({$natural: -1});
        res.render("farmerOneActivities", {farmerOnes:farmerOnes});    
    } catch (error) {
        res.status(400).send("Unable to get farmer One Activities");
    }
    
});


// Ward
router.get('/farmerOneWards', async (req,res) => {
    try {
        const sort = { _id: -1 };
        let farmerOnes = await Registraion.find().sort({$natural: -1});
        res.render("farmerOneWards", {farmerOnes:farmerOnes});    
    } catch (error) {
        res.status(400).send("Unable to get farmer One Wards");
    }
    
});

// 
router.get('/generalUser', (req,res) => {
    res.render('wardList');
});


module.exports = router;

