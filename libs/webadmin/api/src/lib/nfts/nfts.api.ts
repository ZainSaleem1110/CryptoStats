import axiosInstance, { putFromApi } from '../config';
import { ApiNftsRoutes } from './nfts.enum';
import { NftPage, NftResponse } from '@common/types';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useMutation,
  useQuery,
} from 'react-query';
import { useSnack } from '@common/hooks';
import { useNavigate } from 'react-router-dom';

export const UseGetNftList = (): UseInfiniteQueryResult<NftPage> => {
  const getNftList = async ({ pageParam = 0 }) => {
    const { data } = await axiosInstance.get(ApiNftsRoutes.GET_NFT_LIST, {
      params: { page: pageParam },
    });

    return data;
  };

  return useInfiniteQuery([ApiNftsRoutes.GET_NFT_LIST], getNftList, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pageCount > pages.length) {
        return pages.length;
      }
      return undefined;
    },
  });
};

export const useGetNftFromId = (
  nftId: string,
) => {
  const snack = useSnack();
  const getNftById = async () => {
    const { data }: { data: NftResponse } = await axiosInstance.get(
      `${ApiNftsRoutes.GET_NFT_ID}${nftId}`
    );
    return data.item;
  };

  const enabled = nftId !== undefined ? true : false;

  return useQuery([ApiNftsRoutes.GET_NFT_ID], getNftById, {
    onError(e: any) {
      snack('Une erreur est survenue', 'error')
    },
    enabled,
  });
};

export const UseUpdateNft = (
  nftId: string | undefined,
  options?: any
) => {
  const snack  = useSnack();
  const navigate = useNavigate();

  return useMutation(
    (body: any) => putFromApi(`${ApiNftsRoutes.UPDATE_NFT_ID}/${nftId}`, body),
    {
      retry: 5,
      retryDelay: 400,
      ...options,
      onSuccess(data: { data: any }) {
        if (data.data.success === true) {
          snack(data.data.code, 'success')
          navigate('/nfts')
        } 
      },
      onError(e: any) {
        snack(e.message, 'error')
      }
    }
  );
};

export const useRefreshAllNft = () => {
  const snack = useSnack();

  return useMutation(
    () =>
      axiosInstance.post(ApiNftsRoutes.REFRESH_ID),
    {
      onSuccess(data) {
        snack(data.data.message, 'success');
      },
      onError(e: any) {
        snack(e.message, 'error');
      }
    }
  );
};