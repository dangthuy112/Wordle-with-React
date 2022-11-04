import { configureStore } from "@reduxjs/toolkit";
import solutionReducer from './slices/solutionSlice';

const store = configureStore({
    reducer: {
        solution: solutionReducer,
    }
});

export default store;