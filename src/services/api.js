import {AsyncStorage} from 'react-native';
import axios from 'axios';

const API = "https://orthophysio.hom.strongtecnologia.com.br";
//const API = "http://10.1.1.17:8085";

const api = axios.create({
  baseURL: API
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;