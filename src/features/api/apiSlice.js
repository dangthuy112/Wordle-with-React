import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://incongruous-cyber-passionfruit.glitch.me'
    }),
    tagTypes: ['History'],
    endpoints: builder => ({})
})