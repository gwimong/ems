import axios from 'axios';

const serviceService = {
    create: async (newServer) => {
        return await axios.post('http://127.0.0.1:4000/api/servers', newServer);
    },
    readAll: () => {
        return axios.get('http://127.0.0.1:4000/api/servers');
    },
    read: (serverId) => {
        return axios.get('http://127.0.0.1:4000/api/servers/' + serverId);
    },
    update: (serverId, serverObj) => {
        return axios.patch('http://127.0.0.1:4000/api/servers/' + serverId, serverObj);
    },
    updateToPingList: (ids) => {
        return axios.patch('http://127.0.0.1:4000/api/servers/command/ping', {
            ids: ids
        });
    },
    updateToHealthList: (ids) => {
        return axios.patch('http://127.0.0.1:4000/api/servers/command/ssh', {
            ids: ids
        });
    },
    updateToPasswordList: (ids) => {
        return axios.patch('http://127.0.0.1:4000/api/servers/command/passwd', {
            ids: ids
        });
    },
    deleteList: (ids) => {
        return axios.delete('http://127.0.0.1:4000/api/servers', {
            data: { ids: ids }
        });
    }
}

export default serviceService;