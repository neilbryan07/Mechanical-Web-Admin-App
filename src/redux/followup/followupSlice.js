import { createSlice } from "@reduxjs/toolkit"
import { getFollowUpList } from "./followupThunk";

const initialState = {
    followupResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const followupSlice = createSlice({
    name: "followup",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFollowUpList.pending, (state) => {
                state.action = {
                    followupResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getFollowUpList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    followupResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getFollowUpList.rejected, (state, action) => {
                state.followupResponse = {
                    followupResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const followupAction = followupSlice.actions;
export default followupSlice.reducer;