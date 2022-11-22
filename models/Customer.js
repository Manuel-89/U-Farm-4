const express = require('express');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    uniqueId:{
        type: String,
        required: false
    },
      wardName:{
        type: String,
        required: true
    },
    produceName:{
        type: String,
        required: true
    },
    deliveryMode:{
       type: String
    },
    productUploadDate:{
        type: Date,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    produceQuantity:{
        type: Number,
        required: true
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration",
        required: true
    },
    productImage:{
        type: String,
    
    },
    paymentMethod:{
        type: String
    },
    status: {
        type: String,
        default:"Pending",
        enum:["Pending", "Approved"]
    },
    availability: {
        type: String,
        default: "available", 
        enum: ["available", "booked","N/A"]
    }

});

module.exports = mongoose.model("Customer", produceSchema);
