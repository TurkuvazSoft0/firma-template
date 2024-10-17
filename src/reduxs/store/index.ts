import AsyncStorage from '@react-native-async-storage/async-storage';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import {rootReducer} from '../reducers/rootReducer';
const config = {
  key: 'ezcode',
  keyPrefix: '',
  storage: AsyncStorage,
  throttle: 1000,
  blacklist: [],
  whitelist: ['app'],
};

const persistedReducer = persistReducer(config, rootReducer);
const middlewares = [thunk];

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middlewares),
});
let persistor = persistStore(store);

export {persistor};
export default store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
