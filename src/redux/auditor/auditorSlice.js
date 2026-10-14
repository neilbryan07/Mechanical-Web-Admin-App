import { createSlice } from "@reduxjs/toolkit"
import { getAuditorList } from "./auditorThunk";

const initialState = {
    auditorResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const auditorSlice = createSlice({
    name: "auditor",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAuditorList.pending, (state) => {
                state.action = {
                    auditorResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getAuditorList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    auditorResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getAuditorList.rejected, (state, action) => {
                state.auditorResponse = {
                    auditorResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const auditorAction = auditorSlice.actions;
export default auditorSlice.reducer;