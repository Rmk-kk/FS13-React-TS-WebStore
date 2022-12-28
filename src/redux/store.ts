import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer from "./slices/productReducer";
import categoriesReducer from "./slices/categoryReducer";
import cartReducer from "./slices/cartReducer";
import tokenReducer from "./slices/userTokenReducer";

export const store = configureStore({
  reducer: {
    productReducer,
    categoriesReducer,
    cartReducer,
    tokenReducer
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
