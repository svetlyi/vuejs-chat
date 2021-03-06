import Axios from "axios";
import auth from "./user/repository/user";
import config from "./config";

function ChatAxios() {}

let instance = null
let authToken = ''

ChatAxios.prototype.getInst = function () {
  if ('' === authToken && null !== auth.getToken()) {
    authToken = auth.getToken()
    instance = null
  }

  if (null === instance) {
    let axiosConfig = {
      baseURL: config.serverAddress + '/api/',
      timeout: 1000,
      headers: {AUTH_TOKEN: authToken}
    };
    instance = Axios.create(axiosConfig)
  }

  return instance
}

let chatAxios = new ChatAxios()

export default chatAxios