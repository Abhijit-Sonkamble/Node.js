const AdminService = require("../services/admin.services")

const adminService = new AdminService()

const statusCode = require("http-status-codes");
const { successRes } = require("../utils/response");
const { MSG } = require("../utils/msg");

const bcrypt = require("bcrypt")

const moment = require("moment")


module.exports.register = async (req, res) => {

    try {

        const password = req.body.password;


      req.body.password =   await bcrypt.hash(req.body.password, 12)

        req.body.create_at = moment().format('DD/MM/YYYY, h:mm:ss a');
        req.body.update_at = moment().format('DD/MM/YYYY, h:mm:ss a');


        const newAdmin = await adminService.register(req.body);

        if (!newAdmin) {

            console.log("Not added")
            return res.status(statusCode.BAD_REQUEST).json(successRes(statusCode.BAD_REQUEST, true, MSG.USER_REGISTER_FAILED));

        }
        console.log("Added........")
        return res.status(statusCode.CREATED).json(successRes(statusCode.CREATED, false, MSG.USER_REGISTER_SUCCESS, newAdmin));

    } catch (error) {
        console.log("Error in register : ", error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(successRes(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SERVER_ERROR));

    }



}