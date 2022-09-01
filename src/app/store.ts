import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminSlice from '../features/admin/adminSlice';
import filterReducer from '../features/filter/filterSlice';
import productReducer from '../features/product/productSlice';
import userReducer from '../features/user/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ["favProducts"]
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer)


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    product: productReducer,
    admin: adminSlice,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    { serializableCheck: false, }
  )
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
