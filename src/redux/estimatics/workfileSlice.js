import { createSlice } from "@reduxjs/toolkit"
import { getFilteredWorkfile } from "./workfileThunk";

const initialState = {
    workfileResponse: {
        loading: true,
        status: "pending",
        data: [],
        pagination: {
            current: 0,
            size: 10,
            count: 0,
        },
        error: {},
    },
}

const workfileSlice = createSlice({
    name: "workfile",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredWorkfile.pending, (state) => {
                state.action = {
                    workfileResponse: {
                        loading: true,
                        status: "pending",
                        pagination: {
                            current: 0,
                            size: 10,
                            count: 0,
                        },
                    }
                };
            })
            .addCase(getFilteredWorkfile.fulfilled, (state, action) => {
                const list = action.payload;
                const pagination = state?.action?.workfileResponse?.pagination;
                
                state.action = {
                    workfileResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list.data,
                        pagination: {
                            current: list.currentPage,
                            size: pagination?.size,
                            count: list.count,
                        }
                    }
                };
            })
            .addCase(getFilteredWorkfile.rejected, (state, action) => {
                state.workfileResponse = {
                    workfileResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const workfileAction = workfileSlice.actions;
export default workfileSlice.reducer;