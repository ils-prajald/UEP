import env from "../config"
import CryptoJS from "react-native-crypto-js"

export const encryptData = (data : any) => {
    return {
        data: {
            newData: CryptoJS.AES.encrypt(
                JSON.stringify(data),
                env.ENCRYPT_KEY,
            ).toString()
        }
    }
    // return data;
};

export const decryptData = (data : any) => {
    let bytes = CryptoJS.AES.decrypt(data, env.ENCRYPT_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // return data;
};