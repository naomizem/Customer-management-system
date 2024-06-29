import axios from "axios";

class PaturService {
    getPaturDetails() {
        return axios.get("http://localhost:3000/api/paturDetalis");
    }

    getPaturDetailsById(id: string) {
        return axios.get(`http://localhost:3000/api/paturDetalis/${id}`);
    }

    insertPaturDetails(paturData: any) {
        return axios.post("http://localhost:3000/api/paturDetalis", paturData);
    }

    updatePaturDetailsById(id: string, paturData: any) {
        return axios.put(`http://localhost:3000/api/paturDetalis/${id}`, paturData);
    }

    deletePaturDetailsById(id: string) {
        return axios.delete(`http://localhost:3000/api/paturDetalis/${id}`);
    }
}

export default new PaturService();
