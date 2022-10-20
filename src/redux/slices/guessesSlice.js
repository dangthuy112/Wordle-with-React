import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    guesses: [...Array(6)]
}

export const guessesSlice = createSlice({
    name: 'guesses',
    initialState,
    reducers: {
        setGuesses: (state, action) => {
            state.guesses = action.payload;
        },
    },
})

export const { setGuesses } = guessesSlice.actions;

export default guessesSlice.reducer;