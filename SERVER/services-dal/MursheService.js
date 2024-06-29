const fs = require('fs');
const path = require('path');
const mursheFilePath = path.join(__dirname, '../data/mursheDetalis.json');
const logChange = require('../logService');

class MursheService {
    
    getAll() {
        const data = fs.readFileSync(mursheFilePath, 'utf8');
        return JSON.parse(data);
    }

    get(id) {
        const mursheDetalis = this.getAll();
        let foundMursheDetalis = mursheDetalis.filter(s => s.id == id);
        return foundMursheDetalis.length > 0 ? foundMursheDetalis[0] : null;
    }

    insert(newMursheDetalis) {
        const mursheDetalis = this.getAll();
        let foundMursheDetalisWithSameId = mursheDetalis.filter(s => s.id == newMursheDetalis.id);
        if (foundMursheDetalisWithSameId.length > 0)
            throw new Error('invalid new murshe id');
        else {
            mursheDetalis.push(newMursheDetalis);
            fs.writeFileSync(mursheFilePath, JSON.stringify(mursheDetalis, null, 2));
            logChange('insert', 'mursheDetalis', newMursheDetalis);
            return newMursheDetalis;
        }
    }

    update(id, mursheDetalisToUpdate) {
        const mursheDetalis = this.getAll();
        let existingMursheDetalis = mursheDetalis.filter(s => s.id == id);
        if (existingMursheDetalis.length == 0) {
            throw new Error(`could not update murshe id ${id}, murshe not found`);
        }
        Object.assign(existingMursheDetalis[0], mursheDetalisToUpdate);
        fs.writeFileSync(mursheFilePath, JSON.stringify(mursheDetalis, null, 2));
        logChange('update', 'mursheDetalis', mursheDetalisToUpdate);
        return existingMursheDetalis[0];
    }

    delete(id) {
        const mursheDetalis = this.getAll();
        let mursheDetalisIndexToDelete = mursheDetalis.findIndex(murshe => murshe.id == id);
        if (mursheDetalisIndexToDelete >= 0) {
            mursheDetalis.splice(mursheDetalisIndexToDelete, 1);
            fs.writeFileSync(mursheFilePath, JSON.stringify(mursheDetalis, null, 2));
            logChange('delete', 'mursheDetalis', mursheDetalisIndexToDelete);
            return true;
        }
        return false;
    }
}

let mursheService = new MursheService();
module.exports = mursheService;
