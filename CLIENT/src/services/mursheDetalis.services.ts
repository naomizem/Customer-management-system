import axios from "axios";

class MursheService {
    getMursheDetails() {
        return axios.get("http://localhost:3000/api/mursheDetalis");
    }

    getMursheDetailsById(id: string) {
        return axios.get(`http://localhost:3000/api/mursheDetalis/${id}`);
    }

    insertMursheDetails(mursheData: any) {
        return axios.post("http://localhost:3000/api/mursheDetalis", mursheData);
    }

    updateMursheDetailsById(id: string, mursheData: any) {
        return axios.put(`http://localhost:3000/api/mursheDetalis/${id}`, mursheData);
    }

    deleteMursheDetailsById(id: string) {
        return axios.delete(`http://localhost:3000/api/mursheDetalis/${id}`);
    }
}

export default new MursheService();
