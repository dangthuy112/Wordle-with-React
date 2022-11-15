import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        id: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { username, _id } = action.payload;
            state.username = username;
            state.id = _id;
        },
        logOut: (state, action) => {
            state.username = null;
            state.id = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUsername = (state) => state.auth.user;
export const selectCurrentID = (state) => state.auth.id;

export default authSlice.reducer