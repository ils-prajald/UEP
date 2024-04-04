import { USER_LOGIN } from "../types";
import authServices from "../../services/authServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
)