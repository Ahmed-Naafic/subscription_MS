const mongoose = require ("mongoose");

const planSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    service :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "service"
    },
    price :{
        type : Number,
        required: true,
        default : 0,
    }
}
)

module.exports = mongoose.model("plans", planSchema)