import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './rootReducer';
import {CountryItem} from 'types/component-types';
import {countryCodes} from 'constants/data/countryCodes/countryCodes';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IAppState {
  appLoading: boolean;
  intro: boolean;
  theme: ThemeMode;
  language: CountryItem;
  alert: {
    type: 'notification' | 'success' | 'error';
    title: string;
    message: string;
  } | null;
}

export const initialState: IAppState = {
  appLoading: false,
  alert: null,
  theme: ThemeMode.DARK,
  intro: true,
  language: countryCodes[0],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppAlert: (
      state: IAppState,
      action: PayloadAction<{
        type: 'notification' | 'success' | 'error';
        message: string;
        title: string;
      } | null>,
    ) => {
      state.alert = action.payload;
    },
    setAppLoading: (state: IAppState, {payload}: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
    setAppIntro: (state: IAppState, {payload}: PayloadAction<boolean>) => {
      state.intro = payload;
    },
    switchTheme: (state: IAppState) => {
      state.theme === ThemeMode.DARK
        ? (state.theme = ThemeMode.LIGHT)
        : (state.theme = ThemeMode.DARK);
    },
    setLanguage: (state: IAppState, {payload}: PayloadAction<CountryItem>) => {
      state.language = payload;
    },
    clearAlert: state => {
      state.alert = null;
    },
  },
});

export const {
  setAppLoading,
  setAppAlert,
  clearAlert,
  switchTheme,
  setAppIntro,
  setLanguage,
} = appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
