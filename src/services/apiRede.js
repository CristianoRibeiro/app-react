import {AsyncStorage} from 'react-native';
import axios from 'axios';

const API = 'https://rededoconhecimento-ws.azurewebsites.net';
//const API = "https://rededoconhecimento-ws-hml.azurewebsites.net";


const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use(
  async function(config) {

      config.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default api;
