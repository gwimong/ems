import axios from 'axios';

const inspaceProductService = {

    readAll: () => {
        return axios.get('http://localhost:4000/api/inspace-products');
    },

    update: (id, softwareType, isAuthorized) => {
        //return axios.patch('http://localhost:4000/api/inspace-products/' + productId + "/software-type/" + softwareType + "/authorized/" + isAuthorized);
        return axios.patch('http://localhost:4000/api/inspace-products/' + id, {
            SoftwareType: softwareType,
            IsAuthorized: isAuthorized
        });
    },

    updateList: (ids, softwareType, isAuthorized) => {
        return axios.patch('http://localhost:4000/api/inspace-products/software-type/' + softwareType + "/authorized/" + isAuthorized, {
            //return axios.patch('http://localhost:4000/api/inspace-products/' + productId, {
            ids: ids
        });
    },

    delete: (id) => {
        return axios.delete('http://localhost:4000/api/inspace-products/' + id);
    },

    deleteList: (ids) => {
        return axios.delete('http://localhost:4000/api/inspace-products', {
            data: { ids: ids }
        });
    }
}

export default inspaceProductService;