import { useMutation } from 'react-query';
import axiosInstance from '../config';

export const useUploads = (
  userID: string | undefined, 
  options?: any, 
) =>
  useMutation(
    (body: FormData) =>
      axiosInstance.put(`apiadmin/users/refresh/${userID}`, body, {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
        },
      }),
    {
      retry: 5,
      retryDelay: 400,
      ...options,
    }
  );
