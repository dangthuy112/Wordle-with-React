import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: userData => ({
                url: '/auth',
                method: 'POST',
                body: { ...userData }
            })
        })
    })
})

export const { useLoginMutation } = authApiSlice