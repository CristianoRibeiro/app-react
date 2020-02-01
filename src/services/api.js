import {AsyncStorage} from 'react-native';
import axios from 'axios';

//const API = 'https://viva-fenae.strongtecnologia.com.br';
const API = "http://10.1.1.17:8085";

const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use(
  async function(config) {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Version: '1.5.9',
      };
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default api;
