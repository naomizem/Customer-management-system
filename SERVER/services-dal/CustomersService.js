const fs = require('fs');
const path = require('path');
const customersFilePath = path.join(__dirname, '../data/customer.json');
const logChange = require('../logService');

class CustomersService {
    constructor() {
        this.customers = this.loadCustomers();
    }

    loadCustomers() {
        try {
            const data = fs.readFileSync(customersFilePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading customers file:', err);
            return [];
        } 
    }

    saveCustomers() {
        try {
            fs.writeFileSync(customersFilePath, JSON.stringify(this.customers, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing customers file:', err);
        }
    }

    getAll() {
        return this.customers;
    }

    get(id) {
        let foundCustomer = this.customers.find(s => s.id == id);
        return foundCustomer ? foundCustomer : null;
    }

    insert(newCustomer) {
        let foundCustomerWithSameId = this.customers.find(s => s.id == newCustomer.id);
        if (foundCustomerWithSameId)
            throw new Error('invalid new customer id');
        else {
            this.customers.push(newCustomer);
            this.saveCustomers();
            logChange('insert', 'customers', newCustomer);
            return newCustomer;
        }
    }

    update(id, customerToUpdate) {
        let existingCustomer = this.customers.find(s => s.id == id);
        if (!existingCustomer) {
            throw new Error(`could not update customer id ${id}, customer not found`);
        }
        Object.assign(existingCustomer, customerToUpdate);
        this.saveCustomers();
        logChange('update', 'customers', customerToUpdate);
        return existingCustomer;
    }

    delete(id) {
        let customerIndexToDelete = this.customers.findIndex(s => s.id == id);
        if (customerIndexToDelete >= 0) {
            const deletedCustomer = this.customers[customerIndexToDelete];
            this.customers.splice(customerIndexToDelete, 1);
            this.saveCustomers();
            logChange('delete', 'customers', deletedCustomer);
            return true;
        }
        return false;
    }
}

let customersService = new CustomersService();
module.exports = customersService;
