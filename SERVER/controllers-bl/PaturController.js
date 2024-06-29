const Controller = require("./Controller");
const PaturService = require('../services-dal/PaturService');

class PaturDetalisController extends Controller {
    constructor() {
        super(PaturService);
    }
}

let paturDetalisController = new PaturDetalisController();
module.exports = paturDetalisController;
