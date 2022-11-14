import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get previous game history of user
        getHistory: builder.query({
            query: id => `/users/history/${id}`,
            transformResponse: responseData => {
                return responseData.history
            },
            providesTags: ['Stat']
        }),
        //get stat of user
        getStat: builder.query({
            query: id => `/users/stat/${id}`,
            transformResponse: responseData => {
                return responseData.stat
            },
            providesTags: ['Stat']
        }),
        //update stat of user
        updateStat: builder.mutation({
            query: userData => ({
                url: '/users/stat',
                method: 'PUT',
                body: { ...userData }
            }),
            invalidatesTags: ['Stat']
        })
    })
})

export const {
    useGetHistoryQuery,
    useUpdateHistoryMutation,
    useGetStatQuery,
    useUpdateStatMutation
} = userApiSlice;