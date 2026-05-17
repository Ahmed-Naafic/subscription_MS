const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },
    plan :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"plans",
        required : true
    },
    startDate : {
        type: Date,
        default: Date.now
    },
    endDate : Date,
    status:{
        type:String,
        enum:["active", "expired", "cancelled"],
        default:"active"
    },

    
},
{
    timestamps:true
})

module.exports = mongoose.model("subscription", subscriptionSchema);
