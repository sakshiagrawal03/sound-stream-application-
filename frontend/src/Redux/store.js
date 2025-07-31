import { configureStore } from '@reduxjs/toolkit';
import songReducer from './Features/song.Slice';

export const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export default store;