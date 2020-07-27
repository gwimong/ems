import axios from 'axios';

const licensedProductService = {
    create: async (newLicensedProduct) => {
        return await axios.post('http://localhost:4000/api/licensed-products', newLicensedProduct);
    },
    readAll: async () => {
        return await axios.get('http://localhost:4000/api/licensed-products');
    },
    update: async (id, softwareType, isAuthorized) => {
        //return axios.patch('http://localhost:4000/api/licensed-products/' + productId + "/software-type/" + softwareType + "/authorized/" + isAuthorized);
        return await axios.patch('http://localhost:4000/api/licensed-products/' + id, {
            SoftwareType: softwareType,
            IsAuthorized: isAuthorized
        });
    },
    updateList: async (ids, softwareType, isAuthorized) => {
        return await axios.patch('http://localhost:4000/api/licensed-products/software-type/' + softwareType + "/authorized/" + isAuthorized, {
            //return axios.patch('http://localhost:4000/api/licensed-products/' + productId, {
            ids: ids
        });
    },
    delete: async (id) => {
        return await axios.delete('http://localhost:4000/api/licensed-products/' + id);
    },
    deleteList: async (ids) => {
        return await axios.delete('http://localhost:4000/api/licensed-products', {
            data: { ids: ids }
        });
    },
}

export default licensedProductService;