import { createSlice } from '@reduxjs/toolkit';
import { UserAdmin } from '@common/types';

const initialState: UserAdmin = {
  userToken: {
    token: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, { payload }: { payload: string }) => {
      state.userToken.token = payload;
    },
    resetUser: () => initialState,
  },
});

export const { resetUser, setToken } = userSlice.actions;
