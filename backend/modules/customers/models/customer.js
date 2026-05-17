const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        address:{
            type:String,
            trim:true
        },

        role:{
            type:String,
            required:true,
            enum:["customer"],
            default:"customer"
        },
     
      
    },
      {
            timestamps:true
        }
)

module.exports = mongoose.model("customer",customerSchema);
