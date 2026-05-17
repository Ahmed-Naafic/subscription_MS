const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },

        description:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },

        isDeleted : {
            type:Boolean,
            default:false,
        }
    
     
     
      
    },
      {
            timestamps:true
        }
)

module.exports = mongoose.model("services",serviceSchema);
