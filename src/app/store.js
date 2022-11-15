import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import wordsReducer from '../features/words/wordsSlice';
import authReducer from '../features/auth/authSlice'

const store = configureStore({
    reducer: {
        words: wordsReducer,
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat([
            apiSlice.middleware
        ])
    }
});

export default store;