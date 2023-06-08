import axios from 'axios'

const url = 'http://localhost:8000/api'

export const postSignin = (email,password) => axios.post(`${url}/user/login`,email,password);

export const getAllProducts = () => axios.get(`${url}/product/getAllProducts`);

export const verify = (token) => axios.post(`${url}/verify-token`,token);
