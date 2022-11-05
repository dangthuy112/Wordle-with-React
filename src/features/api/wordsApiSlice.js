import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordsApiSlice = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://wordsapiv1.p.rapidapi.com/words/incredible/definitions',
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-RapidAPI-Key', '1ef2003126msh860b9a466280f3bp1d15d2jsnc4b51c4616db');
            headers.set('X-RapidAPI-Host', 'wordsapiv1.p.rapidapi.com');
            return headers;
        }
    }),
    tagTypes: ['Definition'],
    endpoints: builder => ({})
})