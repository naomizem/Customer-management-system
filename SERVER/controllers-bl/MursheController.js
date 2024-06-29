const Controller = require("./Controller");
const MursheService = require('../services-dal/MursheService')

class MursheDetalisController extends Controller {
    constructor() {
        super(MursheService)
    }
}

let mursheDetalisController = new MursheDetalisController();
module.exports = mursheDetalisController;