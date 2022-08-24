import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminSlice from '../features/admin/adminSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    admin: adminSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
