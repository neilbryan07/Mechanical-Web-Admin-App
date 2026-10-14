import { createSlice } from "@reduxjs/toolkit"
import { getStormLocationList } from "./stormLocationThunk";

const initialState = {
    stormLocationResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const stormLocationSlice = createSlice({
    name: "stormLocation",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getStormLocationList.pending, (state) => {
                state.action = {
                    stormLocationResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getStormLocationList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    stormLocationResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getStormLocationList.rejected, (state, action) => {
                state.stormLocationResponse = {
                    stormLocationResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const stormLocationAction = stormLocationSlice.actions;
export default stormLocationSlice.reducer;