import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginOpen: false,
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoginOpen: (state, action) => {
            state.isLoginOpen = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setIsLoginOpen, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
