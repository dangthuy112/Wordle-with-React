import { apiSlice } from "../api/apiSlice";

export const wordsApiSlice = apiSlice.injectEndpoints({
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

export const { useGetWordsQuery } = wordsApiSlice;