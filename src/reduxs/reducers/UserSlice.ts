import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export interface IUserState {
  username: string;
  password: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
}

export const initialUserState: IUserState = {
  username: '',
  password: '',
  isAdmin: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUsername: (state: IUserState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state: IUserState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAdmin: (state: IUserState, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    login: (
      state: IUserState,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout: (state: IUserState) => {
      state.isLoggedIn = false;
      state.username = '';
      state.password = '';
      state.isAdmin = false;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setAdmin,
  login,
  logout,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
