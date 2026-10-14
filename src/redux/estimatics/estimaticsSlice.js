import { createSlice } from "@reduxjs/toolkit"
import { getFilteredEstimatic } from "./estimaticsThunk";

const initialState = {
    estimaticResponse: {
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

const estimaticSlice = createSlice({
    name: "estimatic",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredEstimatic.pending, (state) => {
                state.action = {
                    estimaticResponse: {
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
            .addCase(getFilteredEstimatic.fulfilled, (state, action) => {
                const list = action.payload;
                const pagination = state?.action?.estimaticResponse?.pagination;
                
                state.action = {
                    estimaticResponse: {
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
            .addCase(getFilteredEstimatic.rejected, (state, action) => {
                state.estimaticResponse = {
                    estimaticResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const estimaticAction = estimaticSlice.actions;
export default estimaticSlice.reducer;