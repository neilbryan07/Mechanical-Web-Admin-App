import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    credential : {
      'token' : '',
      'remember' : false,
    },
}

export const tokenSlice = createSlice({
    name : 'token',
    initialState : initialState,
    reducers : {

        tokenStorage : ( state, action ) => {
            state.credential.token = action.payload;
        }, 

        rememberStorage : ( state, action ) => {
            state.credential.remember = action.payload;
        },
    },

})

export const selectToken = ( state ) => state.token.credential.token;
export const selectRemember = ( state ) => state.token.credential.remember;
export const { tokenStorage } = tokenSlice.actions;
export const { rememberStorage } = tokenSlice.actions;

export default tokenSlice.reducer;