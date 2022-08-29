import { useSnack } from "@common/hooks";
import { useQuery } from "react-query";
import axiosInstance from "../config";
import { SearchBarRoute } from "./searchbar.enum";
import { SearchBarResponse } from '@common/types';

export const useGetSearchResult = (
  searchContent: string | undefined,
) => {
  const snack = useSnack();
  const getNftById = async () => {
    const { data }: { data: SearchBarResponse } = await axiosInstance.get(SearchBarRoute.SEARCH_VALUE, { params: {value: searchContent} });
    return data.datas;
  };

  const enabled = searchContent !== undefined ? true : false;

  return useQuery([SearchBarRoute.SEARCH_VALUE], getNftById, {
    onError(e: any) {
      snack(e.message, 'error')
    },
    enabled,
  });
};