import { apiSlice } from "../api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get previous game history of user
        getHistory: builder.query({
            query: id => `/users/history/${id}`,
            transformResponse: responseData => {
                console.log(responseData);
                return responseData.history
            },
            providesTags: ['History']
        }),
        //update history
        updateHistory: builder.mutation({
            query: userData => ({
                url: '/users/history',
                method: 'PUT',
                body: { ...userData }
            }),
            invalidatesTags: ['History']
        })
    })
})

export const { useGetHistoryQuery, useUpdateHistoryMutation } = historyApiSlice;