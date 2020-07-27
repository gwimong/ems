import axios from "axios";

const SessionService = {
    getSession: async (ids, softwareType, isAuthorized) => {
        return await axios.get("http://localhost:4000/api/session");
    },
    login: async (accountInfo) => {
        return await axios.post("http://localhost:4000/api/session/login", accountInfo);
    },
    logOut: async (ids, softwareType, isAuthorized) => {
        return await axios.delete("http://localhost:4000/api/session/logout");
    },
}

export default SessionService;