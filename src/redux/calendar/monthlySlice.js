import { createSlice } from "@reduxjs/toolkit"
import { getMonthlyList } from "./monthlyThunk";

const initialState = {
    monthlyResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const monthlySlice = createSlice({
    name: "monthly",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getMonthlyList.pending, (state) => {
                state.action = {
                    monthlyResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getMonthlyList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    monthlyResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getMonthlyList.rejected, (state, action) => {
                state.monthlyResponse = {
                    monthlyResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const monthlyAction = monthlySlice.actions;
export default monthlySlice.reducer;