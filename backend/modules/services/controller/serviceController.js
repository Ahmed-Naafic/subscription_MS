const Service = require("../models/services.js");

const createService = async (req,res)=>{
    try {
        const {name, description} = req.body; 
        
        if (!name   ) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        //check existing category
        const existingService = await Service.findOne({name});

        if (existinService) {
            return res.status(400).json({
                message : "the service is already exist"
            })
        }

        const service = await Service.create({
            name,
            description,
        })

        res.status(201).json({
            message : "the Service has been created",
            category
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })    
    }
}

const getService = async (req,res)=>{
    try {
        const service = await Service.find({
            isDeleted: false
        });

        if (!service) {
            return res.status(400).json({
                message: "service not found"
            })
        }

        res.status(200).json({service})
        
    } catch (error) {
        res.status(500).json({
            message :error.message
        })
    }
}

const getSingleService =async (req,res)=>{
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(400).json({
                message:"service not found "
            })
        }

        res.status(200).json({service})
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const updateService = async (req,res)=>{
    try {
        const service = await Service.findById(req.params.id);

        if(!service){
            return res.status(400).json({
                message : "service not found "
            })
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body , {new:true, runValidators:true})

        res.status(200).json({
            message : "category updated successfully",
            category : updatedService
        })
        
    } catch (error) {
         res.status(500).json({
      message: error.message,
    });
        
    }

    
}


const deleteService = async (req, res) => {
  try {

   const service = await Service.findById(req.params.id);

    // check product exists
    if (!service || service.isDeleted) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    // delete product (hard delete)
    // await product.deleteOne();


    //soft delete
    service.isDeleted = true;
    service.deletedAt = Date.now();
  await service.save()

    res.status(200).json({
      message: "service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });     
  }
};


module.exports = {createService, getService, getSingleService,updateService,deleteService}
