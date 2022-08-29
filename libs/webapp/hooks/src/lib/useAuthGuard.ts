import { useSelector } from '@webapp/store';

export function useAuthGuard(): [boolean] {
  const info = useSelector((state) => state.user.userToken.token);

  if (info !== '') {
    return [true]
  }

  return [false];
}