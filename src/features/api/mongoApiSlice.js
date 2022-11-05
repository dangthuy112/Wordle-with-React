import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mongoApiSlice = createApi({
    reducerPath: 'mongoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://incongruous-cyber-passionfruit.glitch.me' }),
    tagTypes: ['Words', 'User'],
    endpoints: builder => ({})
})