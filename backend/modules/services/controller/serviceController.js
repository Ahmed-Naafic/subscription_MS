const Service = require("../models/services");

const createService = async (req,res)=>{
    try {
        const {name, description} = req.body; 
        
        if (!name   ) {
            return res.status(400).json({
                message: "name is required"
            })
        }

        const existingService = await Service.findOne({
            name: name.trim(),
            isDeleted: false,
        });

        if (existingService) {
            return res.status(400).json({
                message : "the service already exists"
            })
        }


        const service = await Service.create({
            name,
            description,
        })

        res.status(201).json({
            message : "the Service has been created",
            service
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
        const service = await Service.findOne({
            _id: req.params.id,
            isDeleted: false,
        });

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

        if (req.body.name) {
            const existingService = await Service.findOne({
                name: req.body.name.trim(),
                isDeleted: false,
                _id: { $ne: service._id },
            });

            if (existingService) {
                return res.status(400).json({
                    message : "the service already exists"
                })
            }
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body , {new:true, runValidators:true})

        res.status(200).json({
            message : "service updated successfully",
            service : updatedService
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
        message: "service not found",
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
