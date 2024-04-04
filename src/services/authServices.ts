import axios from "axios";
import { API } from "../config/Api";

const userLogin = async (data: any) => {
    return await axios.post(`${API.User_login}`, data)
        .then(res => { return res })
        .catch(e => { return e?.response });
}

const authServices = {
    userLogin,
}
export default authServices;