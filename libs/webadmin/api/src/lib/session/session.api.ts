import { postFromApi } from '../config';
import { useMutation } from 'react-query';
import { useDispatch, setToken } from '@webadmin/store';
import { ApiAuthRoutes } from './session.enum';
import { useSnack } from '@common/hooks';

interface DataReponse {
  success: boolean;
  token: string;
}

export const UseAuth = (
  email: string,
  password: string,
) => {
  const dispatch = useDispatch();
  const snack = useSnack();
  return useMutation(
    ['Authentification'],
    //@ts-ignore
    () => postFromApi(ApiAuthRoutes.AUTH, { 
      email: email,
      password: password
    }),
    {
      onSuccess(data: { data: DataReponse }) {
        dispatch(setToken(data.data.token));
      },
      onError(e: any)  {
        snack(e.response.data.message, 'error')
      }
    }
  );
};
