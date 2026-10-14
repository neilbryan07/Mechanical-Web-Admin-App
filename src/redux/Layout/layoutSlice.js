import { createSlice, } from "@reduxjs/toolkit";


const initialState = {
    layout : {
      'sideBarValue' : false,
    },
}

export const layoutSlice = createSlice({
    name : 'layout',
    initialState : initialState,
    reducers : {
        sideBarStatus : ( state, action ) => {
            state.layout.sideBarValue = action.payload;
        }, 
    },

})

export const selectLayout = ( state ) => state.layout.layout;
export const { sideBarStatus } = layoutSlice.actions;

export default layoutSlice.reducer;