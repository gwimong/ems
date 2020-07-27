import axios from 'axios';

const userService = {
    create: async (newUser) => {
        return await axios.post('http://localhost:4000/api/users', newUser);
    },
    readAll: () => {
        return axios.get('http://localhost:4000/api/users');
    }
}

export default userService;