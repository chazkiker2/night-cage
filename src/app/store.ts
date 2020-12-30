import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import playerReducer from '../features/player/playerSlice';
// import tileReducer from "../features/tiles/gameSlice";
import gameReducer from "../features/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    // players: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
