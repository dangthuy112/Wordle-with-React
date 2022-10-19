import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    solution: null
}

export const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        setSolution: (state, action) => {
            state.solution = action.payload;
        },
    },
})

export const { setSolution } = solutionSlice.actions;

export default solutionSlice.reducer;