import axiosInstance, { postFromApi } from '../config';
import { useInfiniteQuery, UseInfiniteQueryResult, useMutation, useQuery } from 'react-query';
import { SmartContractsRoute } from './smart-contracts.enum';
import { useSnack } from '@common/hooks';
import { SmartContractPage, SmartContractResponse } from '@common/types';
import { useNavigate } from 'react-router-dom';

interface DataReponse {
  success: boolean;
  code: string;
  message: string;
}

export const UseGetSmartContracts = (): UseInfiniteQueryResult<SmartContractPage> => {
  const getSmartContracts = async ({ pageParam = 0 }) => {
    const { data } = await axiosInstance.get(SmartContractsRoute.GET, {
      params: { page: pageParam, limit: 20 },
    });

    return data;
  };

  return useInfiniteQuery([SmartContractsRoute.GET], getSmartContracts, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.pageCount > pages.length) {
        return pages.length;
      }
      return undefined;
    },
  });
};

export const UseCreateSmartContracts = (
  name: string,
  address: string,
  symbol: string,
) => {
  const snack  = useSnack();
  const navigate = useNavigate();

  return useMutation(
    ['Authentification'],
    //@ts-ignore
    () => postFromApi(SmartContractsRoute.CREATE, { 
      name: name,
      address: address,
      symbol: symbol
    }),
    {
      onSuccess(data: { data: DataReponse }) {
        if (data.data.success === true) {
          snack(data.data.code, 'success')
          navigate('/')
        } else {
          snack(data.data.code, 'error')
        }
      },
    }
  );
};

export const useGetSmartContractFromId = (
  smartContractId: string,
) => {
  const snack = useSnack();
  const getNftById = async () => {
    const { data }: { data: SmartContractResponse } = await axiosInstance.get(
      `${SmartContractsRoute.GET_SMART_ID}${smartContractId}`
    );
    return data.data;
  };

  const enabled = smartContractId !== undefined ? true : false;

  return useQuery([SmartContractsRoute.GET_SMART_ID], getNftById, {
    onError(e: any) {
      snack('Une erreur est survenue', 'error')
    },
    enabled,
  });
};

export const useUpdateSmartContract = (
  smartContractId: string | undefined,
  options?: any
) => {
  const snack  = useSnack();
  const navigate = useNavigate();

  return useMutation(
    (body: any) => postFromApi(`${SmartContractsRoute.CREATE}`, {
      address: smartContractId,
      ...body
    }),
    {
      retry: 5,
      retryDelay: 400,
      ...options,
      onSuccess(data: { data: any }) {
        if (data.data.success === true) {
          snack(data.data.code, 'success')
          navigate('/')
        } 
      },
      onError(e: any) {
        snack(e.message, 'error')
      }
    }
  );
};
