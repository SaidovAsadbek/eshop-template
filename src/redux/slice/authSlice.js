import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    username: null,
    userID: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            // console.log(action.payload);
            const { email, username, userID } = action.payload;
            state.isLoggedIn = true;
            state.email = email;
            state.username = username;
            state.userID = userID;
        },
        REMOVE_ACTIVE_USER: (state, action) => {
            state.isLoggedIn = false;
            state.email = null;
            state.username = null;
            state.userID = null;
            // console.log(state.isLoggedIn);
        },
    },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUsername = (state) => state.auth.username;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer;
