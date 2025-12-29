import Employee from "../models/Employee.js";

//put means partial update not possible only the data sent overwrite 
//patch means partial update
//when update then this return old document so new:true return new document
//and when update not check schema validation so runvalidation true.
export const addEmployee=async(req,res,next)=>{
    try
    {
        const employee=await Employee.create(req.body);
        res.status(200).json({
            message:"employee created successfully",
            data:employee,
            success:true
        });
    }catch(error)
    {
        if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
      
    }
    next(error);
    }   
};

export const getAllEmployee=async(req,res,next)=>{
  try{
    const employee=await Employee.find();
    res.status(200).json({
      message:"All employess data",
      data:employee,
      success:true
    })

  }catch(error)
  {
    next(error);
  }
  

};
export const getEmployeeById=async(req,res,next)=>{
  try{
    // const {id}=req.params.id;
    const employee=await Employee.findById(req.params.id);
    if(!employee)
    {
      return res.status(404).json({
        message:`Employee with id ${req.params.id} not found`,
        success:false
      })
    }
    res.status(200).json({
      message:`Employee with id ${req.params.id}`,
      data:employee,
      success:true
    })
  }catch(error){
    next(error);
  }
};

export const updateEmployee=async(req,res,next)=>{
  try{
    const employee=await Employee.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });
    if(!employee)
    {
     return res.status(404).json({
        message:`Employee with id ${req.params.id} not found`,
        success:false
      }) 
     
    }
    res.status(200).json({
      message:`Employee with id ${req.params.id} updated Sucessfully`,
      data:employee,
      success:true
    })
  }
  catch(error)

  {
    next(error);
  }
};

export const deleteEmployee=async(req,res,next)=>{
  try{
    const employee=await Employee.findByIdAndDelete(req.params.id);
    if(!employee)
    {
       return res.status(404).json({
        message:`Employee with id ${req.params.id} not found`,
        success:false
      }) 
    }
    res.status(200).json({
      message:`Employee with id ${req.params.id} deleted successfully`,
      success:true,
      data:employee
    })

  }
  catch(error)
  {
    next(error);
  }

};