const Controller = require("./Controller");
const CustomersService = require('../services-dal/CustomersService')

class CustomersController extends Controller {
    constructor() {
        super(CustomersService)
    }
}

let customersController = new CustomersController();
module.exports = customersController;