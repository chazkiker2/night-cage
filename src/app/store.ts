import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playerReducer from '../features/player/playerSlice';
import tileReducer from "../features/tiles/tileSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tiles: tileReducer,
    players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
