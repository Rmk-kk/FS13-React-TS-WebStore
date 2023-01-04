import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from "./slices/productReducer";
import categoriesReducer from "./slices/categoryReducer";
import cartReducer from "./slices/cartReducer";
import userReducer from "./slices/userReducer";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    productReducer,
    categoriesReducer,
    cartReducer,
    userReducer
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
