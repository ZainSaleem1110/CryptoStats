import axios from 'axios';
import config from '@config';
import { store } from '@webadmin/store';

const axiosInstance = axios.create({
  baseURL: config.apiURI,
  headers: {
    Authorization: '',
  },
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const { token } = store.getState().user.userToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Generic get call ==> used with react-query
export const getFromApi = async (
  url: string,
  params?: Record<string, unknown>
) => {
  const { data } = await axiosInstance.get(url, { params: params ?? {} });
  return data;
};

// Generic Post call ==> used with react-query
export const postFromApi = async <T>(
  url: string,
  body?: Record<string, unknown>
) => axiosInstance.post<T>(url, body);

// generic Put call ==> used with react-query
export const putFromApi = async (url: string, body: Record<string, unknown>) =>
  axiosInstance.put(url, body);

// generic delete call ==> used with react-query
export const deleteFromApi = async (
  url: string,
  body?: Record<string, unknown>
) => axiosInstance.delete(url, { data: body });

export default axiosInstance;
