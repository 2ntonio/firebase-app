import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectReducer from "../features/project/projectSlice";
import userReducer from "../features/project/userSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
