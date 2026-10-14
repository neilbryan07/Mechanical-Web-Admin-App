import { createSlice } from "@reduxjs/toolkit"
import { getRegionList } from "./regionThunk";

const initialState = {
    regionResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const regionSlice = createSlice({
    name: "region",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getRegionList.pending, (state) => {
                state.action = {
                    regionResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getRegionList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    regionResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getRegionList.rejected, (state, action) => {
                state.regionResponse = {
                    regionResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const regionAction = regionSlice.actions;
export default regionSlice.reducer;