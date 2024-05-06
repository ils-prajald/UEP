import env from '../config'

let Auth_base_url = env?.BASE_URL + "/user/api/";

export const API = {
    "Header_Text": Auth_base_url + "getHeaderText",
    "User_login": Auth_base_url + "userLogin",
    "Country_List": Auth_base_url + "getCountries",
    "User_Register":Auth_base_url + "userRegister"
}