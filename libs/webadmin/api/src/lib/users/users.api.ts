import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  useMutation,
} from 'react-query';
import axiosInstance, { postFromApi, putFromApi } from '../config';
import { UserApiRoutes } from './user.enum';
import { UserPage, UserReponse } from '@common/types';
import { useSnack } from '@common/hooks';
import { useNavigate } from 'react-router-dom';

export const UseGetUserList = (
  periodStart?: string,
  periodEnd?: string
): UseInfiniteQueryResult<UserPage> => {
  const snack = useSnack();

  const getNftUser = async ({ pageParam = 0 }) => {
    const { data } = await axiosInstance.get(UserApiRoutes.USER_LIST, {
      params: {
        page: pageParam,
        limit: 20,
        periodStart,
        periodEnd,
      },
    });

    return data;
  };

  return useInfiniteQuery([UserApiRoutes.USER_LIST], getNftUser, {
    onError(e: any) {
      snack('Une erreur est survenue', 'error');
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.countPage > pages.length) {
        return pages.length;
      }
      return undefined;
    },
  });
};

export const useGetUserFromId = (userId: string) => {
  const snack = useSnack();
  const getUserById = async () => {
    const { data }: { data: UserReponse } = await axiosInstance.get(
      `${UserApiRoutes.USER_ID}${userId}`
    );
    return data.user;
  };

  const enabled = userId !== undefined ? true : false;

  return useQuery([UserApiRoutes.USER_ID], getUserById, {
    onError(e: any) {
      snack('Une erreur est survenue', 'error');
    },
    enabled,
  });
};

export const useRefreshUserFromId = () => {
  const snack = useSnack();

  return useMutation(
    (userId: string) =>
      axiosInstance.put(`${UserApiRoutes.REFRESH_ID}/${userId}`),
    {
      onSuccess(data) {
        snack(data.data.message, 'success');
      },
      onError(e: any) {
        snack(e.message, 'error');
      },
    }
  );
};

export const useUpdateUser = (userId: string | undefined, options?: any) => {
  const snack = useSnack();
  const navigate = useNavigate();

  return useMutation(
    (body: any) => putFromApi(`${UserApiRoutes.UPDATE_USER}/${userId}`, body),
    {
      retry: 5,
      retryDelay: 400,
      ...options,
      onSuccess(data: { data: any }) {
        if (data.data.success === true) {
          snack("L'utilisateur a correctement été modifié", 'success');
          navigate('/users');
        }
      },
      onError(e: any) {
        snack('Une erreur est survenue.', 'error');
      },
    }
  );
};
