import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import tokenReducer from './features/tokenSlice';
import menuReducer from './features/menuSlice';
import globalReducer from './features/globalSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    token:tokenReducer,
    menu:menuReducer,
    global:globalReducer
  },
  // middleware: [],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
