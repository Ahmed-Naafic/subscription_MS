const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    customer :{
        type : mongoose.Types.ObjectId,
        ref:"customer"
    },
    subscription :{
        type : mongoose.Types.ObjectId,
        ref : "subscription"
    },
    amount : Number,

    paymentMethod :{
        type : String,
        enum :["cash", "card" ,"mobile-money"]
    },

    status : {
        type : String,
        enum : ["pending", "paid "]
    }

})
