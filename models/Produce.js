const express = require('express');
const mongoose = require('mongoose');


const produceSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    uniqueId:{
        type: String,
        required: true
    },
    NIN:{
         type: String,
         required: true
    },
    wardName:{
        type: String,
        required: true
    },
    
    uploadDate:{
        type: Date,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    supplierId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registration",
        required: true
    },
    image:{
        type: String,
        required: true
    },
    status: {
        type: String,
        default:"Pending",
        enum:["Pending", "Approved"]
    }

});

module.exports = mongoose.model("Produce", produceSchema);
