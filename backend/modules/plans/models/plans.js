const mongoose = require ("mongoose");

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
    },
    service :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "services",
        required:true,
    },
    price :{
        type : Number,
        required: true,
        default : 0,
    }
    ,
    isDeleted:{
        type : Boolean,
        default : false
    },
    deletedAt:{
        type:Date
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model("plans", planSchema)
