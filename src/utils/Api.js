import axios from "axios"
import { Config, URL } from "../utils/Config"


class Api {
    constructor(url, path, data, Config, method) {

    }

    static async Calls(path, method, data, Config, nourl) {
        let res = []
        try {
            switch (method) {
                case 'GET':
                    if (nourl) {
                        res = await axios.get(`${path}`, Config)
                    } else {
                        res = await axios.get(`${URL}/${path}`, Config)
                    }
                    return res
                    break;
                case 'POST':
                    res = await axios.post(`${URL}/${path}`, data, Config)
                    return res
                    break;
                case 'PUT':
                    res = await axios.put(`${URL}/${path}`, data, Config)
                    return res
                    break;
                case 'DELETE':
                    res = await axios.delete(`${URL}/${path}`, data, Config)
                    return res
                    break;
                default:
                    break;
            }

        }
        catch (e) {
            // console.log()
            return { status: '400', msg: e }
        }

    }


}
export default Api
