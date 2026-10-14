import { createSlice } from "@reduxjs/toolkit"
import { getAdjusterList } from "./adjusterThunk";

const initialState = {
    adjusterResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const adjusterSlice = createSlice({
    name: "adjuster",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAdjusterList.pending, (state) => {
                state.action = {
                    adjusterResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getAdjusterList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    adjusterResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getAdjusterList.rejected, (state, action) => {
                state.adjusterResponse = {
                    adjusterResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const adjusterAction = adjusterSlice.actions;
export default adjusterSlice.reducer;