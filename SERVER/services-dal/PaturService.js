const fs = require('fs');
const path = require('path');
const logChange = require('../logService');
const paturDetalisFilePath = path.join(__dirname, '../data/paturDetalis.json');

class PaturService {
    getAll() {
        try {
            const data = fs.readFileSync(paturDetalisFilePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading paturDetalis file:', err);
            return [];
        }
    }

    get(id) {
        const paturDetalis = this.getAll();
        let foundPaturDetalis = paturDetalis.find(s => s.id == id);
        return foundPaturDetalis ? foundPaturDetalis : null;
    }

    insert(newPaturDetalis) {
        const paturDetalis = this.getAll();
        let foundPaturDetalisWithSameId = paturDetalis.find(s => s.id == newPaturDetalis.id);
        if (foundPaturDetalisWithSameId)
            throw new Error('invalid new patur id');
        
        paturDetalis.push(newPaturDetalis);
        fs.writeFileSync(paturDetalisFilePath, JSON.stringify(paturDetalis, null, 2));
        logChange('insert', 'paturDetalis', newPaturDetalis);
        return newPaturDetalis;
    }

    update(id, paturDetalisToUpdate) {
        const paturDetalis = this.getAll();
        let existingPaturDetalisIndex = paturDetalis.findIndex(s => s.id == id);
        if (existingPaturDetalisIndex === -1) {
            throw new Error(`could not update patur id ${id}, patur not found`);
        }

        paturDetalis[existingPaturDetalisIndex] = {
            ...paturDetalis[existingPaturDetalisIndex],
            ...paturDetalisToUpdate
        };
        fs.writeFileSync(paturDetalisFilePath, JSON.stringify(paturDetalis, null, 2));
        logChange('update', 'paturDetalis', paturDetalisToUpdate);
        return paturDetalis[existingPaturDetalisIndex];
    }

    delete(id) {
        let paturDetalis = this.getAll();
        let deletedPaturDetalis = null;
        paturDetalis = paturDetalis.filter(s => {
            if (s.id === id) {
                deletedPaturDetalis = s;
                return false;
            }
            return true;
        });

        if (deletedPaturDetalis) {
            fs.writeFileSync(paturDetalisFilePath, JSON.stringify(paturDetalis, null, 2));
            logChange('delete', 'paturDetalis', deletedPaturDetalis);
            return true;
        }
        return false;
    }
}

let paturService = new PaturService();
module.exports = paturService;
