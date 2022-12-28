import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from "./slices/productReducer";
import categoriesReducer from "./slices/categoryReducer";
import cartReducer from "./slices/cartReducer";

export const store = configureStore({
  reducer: {
    productReducer,
    categoriesReducer,
    cartReducer
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
