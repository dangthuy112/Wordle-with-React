import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    solution: null,
    definition: []
}

export const solutionSlice = createSlice({
    name: 'solution',
    initialState,
    reducers: {
        //sets the payload as the solution and fetch the definition for the solution
        setSolution: (state, action) => {
            state.solution = action.payload;
        },

        setDefinition: (state, action) => {
            state.definition = action.payload;
        }
    },
})

export const setSolutionAsync = (data) => async (dispatch) => {
    try {
        dispatch(setSolution(data));

        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${data}/definitions`,
            headers: {
                'X-RapidAPI-Key': '1ef2003126msh860b9a466280f3bp1d15d2jsnc4b51c4616db',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        axios.request(options)
            .then((response) => {
                dispatch(setDefinition(response.data.definitions));
            }).catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.log(error);
    }
};

export const { setSolution, setDefinition } = solutionSlice.actions;

export const selectSolution = (state) => state.solution.solution;
export const selectDefinition = (state) => state.solution.definition;

export default solutionSlice.reducer;