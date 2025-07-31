import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songSlice';

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
});

export default store;
