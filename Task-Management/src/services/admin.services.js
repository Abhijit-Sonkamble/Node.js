const Admin = require("../model/admin.model");

module.exports =class AdminService{
    async register (body){

        try {
        return await Admin.create(body)
        } catch (error) {
            console.log("Error in register admin ",error);
        }
    }
}