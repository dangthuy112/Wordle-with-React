import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import axios from 'axios';

const initialState = {
    solution: null,
    definition: []
}

export const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        setSolution: (state, action) => {
            state.solution = action.payload;
        },
        setDefinition: (state, action) => {
            state.definition = action.payload;
        },
    },
})

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getWords: builder.query({
            query: () => '/wordsDB.json',
            transformResponse: responseData => {
                return [...responseData.solutions]
            },
            providesTags: ['Words']
        })
    })
})

export const getNewSolution = (words) => {
    return (dispatch, getState) => {
        const solution = getState().words.solution;
        let newSolution;
        do {
            newSolution = words[Math.floor(Math.random() * words.length)].word;
        } while (solution === newSolution)
        console.log(newSolution);
        dispatch(setSolution(newSolution));
        dispatch(getDefinitionAsync(newSolution));
    }
}

export const getDefinitionAsync = (data) => async (dispatch) => {
    try {
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

export const { setSolution, setDefinition } = wordsSlice.actions;

export const selectSolution = (state) => state.words.solution;
export const selectDefinition = (state) => state.words.definition;

export const { useGetWordsQuery } = extendedApiSlice;

export default wordsSlice.reducer;