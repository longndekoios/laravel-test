import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "./constant";

export const httpGet = (path: string, config?: AxiosRequestConfig<any>) => {
  return axios.get(`${API_URL}/${path}`, config);
}

export const httpPost = (path: string, data: any, config?: AxiosRequestConfig<any>) => {
  return axios.post(`${API_URL}/${path}`, data, config);
}