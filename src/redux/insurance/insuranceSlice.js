import { createSlice } from "@reduxjs/toolkit"
import { getFilteredInsurance } from "./insuranceThunk";

const initialState = {
    insuranceResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const insuranceSlice = createSlice({
    name: "insurance",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredInsurance.pending, (state) => {
                state.action = {
                    insuranceResponse: {
                        loading: true,
                        status: "pending",
                    }
                };
            })
            .addCase(getFilteredInsurance.fulfilled, (state, action) => {
                const list = action.payload;

                state.action = {
                    insuranceResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getFilteredInsurance.rejected, (state, action) => {
                state.insuranceResponse = {
                    insuranceResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const insuranceAction = insuranceSlice.actions;
export default insuranceSlice.reducer;