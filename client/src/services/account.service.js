import axios from 'axios';

const accountService = {
    create: async (newAccount) => {
        return await axios.post('http://localhost:4000/api/accounts', newAccount);
    },
    readAll: () => {
        return axios.get('http://localhost:4000/api/accounts');
    },
    read: (serverId) => {
        return axios.get('http://localhost:4000/api/accounts/' + serverId);
    },
    update: async (serverId, serverObj) => {
        return await axios.patch('http://localhost:4000/api/accounts/' + serverId, serverObj);
    },
    updateToHealthList: (ids) => {
        return axios.patch('http://localhost:4000/api/accounts/command/ssh', {
            ids: ids
        });
    },
    updateToPasswordList: (ids) => {
        return axios.patch('http://localhost:4000/api/accounts/command/passwd', {
            ids: ids
        });
    },
    deleteList: (ids) => {
        return axios.delete('http://localhost:4000/api/accounts', {
            data: { ids: ids }
        });
    }
}

export default accountService;