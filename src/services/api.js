import axios from 'axios';
import { getUser } from "./auth";
import constants from '../constants';

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

api.interceptors.request.use(function (config) {
    const token = getUser().access_token;
    if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

export const getLogin = (email, password) => api.post(`/oauth/token`, {
    grant_type: constants.grant_type,
    client_id: constants.client_id,
    client_secret: constants.client_secret,
    username: email,
    password: password,
    scope: constants.scope
});

export const postRegister = (formData) => api.post(`/api/v1/auth/register`, formData);

export const getCategories = () => api.get(`/api/v1/categories`);
export const postCategories = (formData) => api.post(`/api/v1/categories/store`, formData);
export const getCategory = (id) => api.get(`/api/v1/categories/show/${id}`);
export const putCategories = (id, formData) => api.put(`api/v1/categories/update/${id}`, formData);
export const delCategory = (id) => api.delete(`/api/v1/categories/destroy/${id}`);

export const getBillReceives = () => api.get(`/api/v1/bill_receives`);
export const postBillReceives = (formData) => api.post(`/api/v1/bill_receives/store`, formData);
export const getBillReceive = (id) => api.get(`/api/v1/bill_receives/show/${id}`);
export const putBillReceives = (id, formData) => api.put(`api/v1/bill_receives/update/${id}`, formData);
export const delBillReceive = (id) => api.delete(`/api/v1/bill_receives/destroy/${id}`);

export const getBillPays = () => api.get(`/api/v1/bill_pays`);
export const postBillPays = (formData) => api.post(`/api/v1/bill_pays/store`, formData);
export const getBillPay = (id) => api.get(`/api/v1/bill_pays/show/${id}`);
export const putBillPays = (id, formData) => api.put(`api/v1/bill_pays/update/${id}`, formData);
export const delBillPay = (id) => api.delete(`/api/v1/bill_pays/destroy/${id}`);

export const sumChartsByPeriod = (formData) => api.post(`/api/v1/charts`, formData);
export const getStatementByPeriod = (formData) => api.post(`/api/v1/statement`, formData);

const apis = {
    getLogin,
    postRegister,
    getCategories,
    postCategories,
    getCategory,
    putCategories,
    delCategory,
    getBillReceives,
    postBillReceives,
    getBillReceive,
    putBillReceives,
    delBillReceive,
    getBillPays,
    postBillPays,
    getBillPay,
    putBillPays,
    delBillPay,
    sumChartsByPeriod,
    getStatementByPeriod
};

export default apis;