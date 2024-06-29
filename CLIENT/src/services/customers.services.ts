import axios from "axios";

class CustomersService {
    getCustomers() {
        return axios.get("http://localhost:3000/api/customers");
    }

    getCustomerById(id: string) {
        return axios.get(`http://localhost:3000/api/customers/${id}`);
    }

    insertCustomer(customerData: any) {
        return axios.post("http://localhost:3000/api/customers", customerData);
    }

    updateCustomerById(id: string, customerData: any) {
        return axios.put(`http://localhost:3000/api/customers/${id}`, customerData);
    }

    deleteCustomerById(id: string) {
        return axios.delete(`http://localhost:3000/api/customers/${id}`);
    }
}

export default new CustomersService();
