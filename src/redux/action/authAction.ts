import { USER_LOGIN, HEADER_TEXT, CREATE_ACCOUNT,  } from "../types";
import authServices from "../../services/authServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../../utilities/Cryoto";

export const fetchHeaderText = createAsyncThunk(
    HEADER_TEXT,    
    async () => {
        try {
            // Call authService to fetch header text
            const headerText = await authServices.getHeaderText();
            let res;
            res = decryptData(headerText)
            return res?.data; // Return the fetched data
        } catch (error) {
            throw error; // Throw error if something goes wrong
        }
    }
);


export const userLogin = createAsyncThunk(
    USER_LOGIN,
    async (data: any) => {
        const response = await authServices.userLogin(data)
        let res;
        if (response?.status === 200) res = (response?.data);
        else res = { ...response?.data, error: true };
        console.log("DATA",res.data);
        
        return res
    }
);

export const userRegister = createAsyncThunk(
    CREATE_ACCOUNT,
    async (data: any) => {
        const response = await authServices.userregister(encryptData(data))
        let res;
        if (response?.status === 200) res = decryptData(response?.data);
        else res = { ...response?.data, error: true };
        console.log("DATA",res.data);
        
        return res
    }
);

// export const fetchCountryList = createAsyncThunk(
//     Country_List,    
//     async () => {
//         try {
//             // Call authService to fetch header text
//             const countrylist = await authServices.countryList();
//             let res;
//             res = decryptData(countrylist)
//             console.log("res",res.data);
//             return res?.data; // Return the fetched data
//         } catch (error) {
//             throw error; // Throw error if something goes wrong
//         }
//     }
// );