import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheCollection";
import { mongoApiSlice } from './api/mongoApiSlice';
import { wordsApiSlice } from './api/wordsApiSlice';

const initialState = {
    words: [],
    solution: null,
    definition: []
}

export const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        setWords: (state, action) => {
            state.solution = action.payload;
        },
    },
})

export const extendedMongoApiSlice = mongoApiSlice.injectEndpoints({
    endpoints: builder => ({
        getWords: build.query({
            query: () => '/wordsDB.json',
            transformResponse: responseData => responseData.json()
                .then(data => {
                    return setWords([...data.solutions])
                })
        })
    })
})

export const selectSolution = (state) => state.words.solution;
export const selectDefinition = (state) => state.words.definition;
export const selectWords = (state) => state.words.words;

export const { useGetWordsQuery } = extendedMongoApiSlice;

export default wordsSlice.reducer;