import { createSlice } from "@reduxjs/toolkit"
import { getFilteredEstimator } from "./estimatorThunk";

const initialState = {
    estimatorResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const estimatorSlice = createSlice({
    name: "estimator",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredEstimator.pending, (state) => {
                state.action = {
                    estimatorResponse: {
                        loading: true,
                        status: "pending",
                    }
                };
            })
            .addCase(getFilteredEstimator.fulfilled, (state, action) => {
                const list = action.payload;

                state.action = {
                    estimatorResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getFilteredEstimator.rejected, (state, action) => {
                state.estimatorResponse = {
                    estimatorResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const estimatorAction = estimatorSlice.actions;
export default estimatorSlice.reducer;