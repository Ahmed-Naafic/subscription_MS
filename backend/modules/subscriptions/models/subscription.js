const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Types.ObjectId,
        ref:"customer",
        required:true
    },
    plan :{
        type : mongoose.Types.ObjectId,
        ref:"plans",
        required : true
    },
    startDate : Date,
    endDate : Date,

    
})