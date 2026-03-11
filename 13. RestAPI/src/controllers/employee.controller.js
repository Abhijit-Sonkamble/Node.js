const Employee = require("../model/emp.module")

module.exports.addEmp = async(req, res)=>{
    try {
        console.log(req.body);
        const newEmp = await Employee.create(req.body);

        if (!newEmp) {
            return res.status(400).json({status:400, error:true, msg:"Not Added"});
        }
            return res.status(200).json({status:200, error:true, msg:"Added....."});
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({msg:"Something went wrong"});
    }
}

//Fetch
module.exports.fetchEmp = async(req, res)=>{
    try {
        console.log(req.body);
        const allEmp = await Employee.find(req.body);
        console.log(allEmp);
        

            return res.status(200).json({status:200, error:false, msg:"Fetch.....!", allEmp});
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({msg:"Something went wrong"});
    }
}

// //Delete
module.exports.deleteEmp = async(req, res)=>{
try {
        const deleteEmp = await Employee.findByIdAndDelete(req.query.id);
       
         if (!deleteEmp) {
            return res.status(400).json({status:400, error:true, msg:"Not deleted"});
        }

            return res.status(200).json({status:200, error:false, msg:"deleted.....!"});
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({msg:"Something went wrong"});
    }
}

//Update
module.exports.updateEmp = async(req, res)=>{
try {
        const updateEmp = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true});
       
         if (!updateEmp) {
            return res.status(400).json({status:400, error:true, msg:"Not updated"});
        }

            return res.status(200).json({status:200, error:false, msg:"Updated.....!"});
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({msg:"Something went wrong"});
    }
}

// Single Fetch-Employee
module.exports.fetchSingleEmp = async(req, res)=>{
    try {
        console.log(req.body);
        const fetchSingleEmp = await Employee.findById(req.params.id);
        if (!fetchSingleEmp) {
            return res.status(400).json({status:400, error:true, msg:"Not Fetch single Employee....!"});
        }
        

            return res.status(200).json({status:200, error:false, msg:"Not Fetch single Employee....!", fetchSingleEmp});
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({msg:"Something went wrong"});
    }
}