import env from '../config'

let Auth_base_url = env?.BASE_URL + "/user/api/";

export const API = {
    "User_login": Auth_base_url + "userLogin",
}