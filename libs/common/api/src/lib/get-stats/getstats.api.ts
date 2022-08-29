import { useSnack } from "@common/hooks";
import { useQuery } from "react-query";
import axiosInstance from "../config";
import { StatRoute } from "./getstats.enum";
import { GetStats } from '@common/types';

export const useGetStats = () => {
  const snack = useSnack();
  const getNftById = async () => {
    const { data }: { data: GetStats } = await axiosInstance.get(StatRoute.GET_ALL);
    return data.data;
  };

  return useQuery([StatRoute.GET_ALL], getNftById, {
    onError(e: any) {
      snack(e.message, 'error')
    },
  });
};