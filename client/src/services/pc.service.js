import axios from 'axios';

const pcService = {
    readAll: () => {
        return axios.get('http://localhost:4000/api/pcs');
    }
}

export default pcService;