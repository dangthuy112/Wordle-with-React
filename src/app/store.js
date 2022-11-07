import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from '../features/wordsSlice';
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
    reducer: {
        words: wordsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat([
            apiSlice.middleware
        ])
    }
});

export default store;