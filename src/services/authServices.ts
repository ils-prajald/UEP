import axios from "axios";
import { API } from "../config/Api";


const getHeaderText = async () => {
    try {
        const response = await axios.get(API.Header_Text);
        // console.log('Response Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching header text:', error);
        throw error;
    }
};

const userLogin = async (data: any) => {
    return await axios.post(`${API.User_login}`, data)
        .then(res => { return res })
        .catch(e => { return e?.response });
};

// const countryList = async () => {
//     try{
//         const response = await axios.get(API.Country_List);
//         return response.data;
//     }catch (error) {
//         console.error('Error fetching country list:', error);
//         throw error;
//     }
// }

const userregister = async (data: any) => {
    return await axios.post(`${API.User_Register}`, data)
        .then(res => { return res })
        .catch(e => { return e?.response });
};

const authServices = {
    userLogin,
    getHeaderText,
    userregister,
    // countryList,
}
export default authServices;