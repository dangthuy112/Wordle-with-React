import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from '../features/wordsSlice';

const store = configureStore({
    reducer: {
        words: wordsReducer,
    }
});

export default store;