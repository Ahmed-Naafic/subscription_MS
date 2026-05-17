const Plan = require("../models/plans.js");
const Service = require("../../services/models/services.js");
const mongoose = require("mongoose");


const createPlan= async (req, res) => {
  try {
    const {
      name,
      price,
      service,
     
    } = req.body;

    // validation
    if (!name || price === undefined || !service) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        message:"invalid service"
      })
    }

    const existingService = await Service.findOne({
      _id: service,
      isDeleted: false,
    });

    if(!existingService) {
      return res.status(400).json({
        message:"invalid service"
      })
    }

    const plan = await Plan.create({
      name,
      price,
      service: existingService._id,
    });

    res.status(201).json({
      message: "plan created successfully",
      plan,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getPlan = async (req, res) => {
  try {

    const {
   
      service,
      keyword,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    // query object
    const query = {
      isDeleted: false,
    };

    // search by keyword
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    if (service) {
      if (!mongoose.Types.ObjectId.isValid(service)) {
        return res.status(400).json({
          message: "Invalid service",
        });
      }

      query.service = new mongoose.Types.ObjectId(service);
    }

    // filter price
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // pagination
    const skip = (page - 1) * limit;

    const plans = await Plan.find(query)
      .populate("service", "name ")
      .skip(skip)
      .limit(Number(limit));

    const total = await Plan.countDocuments(query);

    res.status(200).json({
      plans,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getSinglePlan = async (req,res)=>{
    try {
        const plan = await Plan.findOne({_id:req.params.id, isDeleted:false})
          .populate("service", "name");

        if(!plan){
            return res.status(404).json({
                message : "plan not found"
            })
        }
        
    res.status(200).json(plan)
    } catch (error) {
          res.status(500).json({
      message: error.message,
    });}
}


const updatePlan = async (req,res)=>{
    try {
        const plan = await Plan.findOne({
          _id: req.params.id,
          isDeleted: false,
        });

        if(!plan){
            return res.status(404).json({
                message : "plan not found"
            })
        }

        const updateData = { ...req.body };

        if (updateData.service) {
          if (!mongoose.Types.ObjectId.isValid(updateData.service)) {
            return res.status(400).json({
              message: "Invalid service",
            });
          }

          const existingService = await Service.findOne({
            _id: updateData.service,
            isDeleted: false,
          });

          if (!existingService) {
            return res.status(400).json({
              message: "invalid service",
            });
          }

          updateData.service = existingService._id;
        }

        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, updateData , {new:true, runValidators:true})
          .populate("service", "name")

        res.status(200).json({
            message : "plan updated successfully",
            plan : updatedPlan
        })
        
    } catch (error) {
         res.status(500).json({
      message: error.message,
    });
        
    }

    
}

const deletePlan = async (req, res) => {
  try {

    const plan = await Plan.findById(req.params.id);

    if (!plan || plan.isDeleted) {
      return res.status(404).json({
        message: "Plan not found",
      });
    }

    plan.isDeleted = true;
    plan.deletedAt = Date.now();
    await plan.save()

    res.status(200).json({
      message: "Plan deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createPlan,
  getPlan,
  getSinglePlan,
  updatePlan,
  deletePlan,
};
