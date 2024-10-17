import { combineReducers } from '@reduxjs/toolkit';
import app, { initialState as appInitState } from './app-reducer';
import user, { initialUserState } from './UserSlice'; // userSlice dosyasını ve initial state'i import edin
import adminPanelSlice, { initialAdminPanelState } from './adminSlice';
import SirketlerSlice, { initialSirketlerState } from './SirketlerSlice';
import UserRegister, { initialUserRegisterState } from './UserRegister'; // UserRegister initial state import
import mailSlice,{initialMailState} from './teklifSlice';

// Reducer'ları birleştirerek rootReducer oluşturun
export const rootReducer = combineReducers({
  app: app,
  user: user, // user reducer'ını rootReducer'a ekleyin
  sirketler: SirketlerSlice,
  register: UserRegister, // UserRegister reducer'ını ekleyin
  teklif:mailSlice
});

// RootState tipini rootReducer'dan türetin
export type RootState = ReturnType<typeof rootReducer>;

// Initial State'i oluşturun
const initialState: RootState = {
  app: appInitState,
  user: initialUserState, // user başlangıç durumunu ekleyin
  sirketler: initialSirketlerState,
  register: initialUserRegisterState, // UserRegister başlangıç durumunu ekleyin
  teklif:initialMailState
};

// `CLEAR_PERSIST_DATA` durumunda tüm verileri sıfırlama işlemi
export default (state: RootState | undefined, action: any) => {
  if (action.type === 'CLEAR_PERSIST_DATA') {
    return rootReducer(initialState, action);
  }
  return rootReducer(state, action);
};
