import { createSlice } from "@reduxjs/toolkit"
import { getWeeklyList } from "./weeklyThunk";

const initialState = {
    weeklyResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const weeklySlice = createSlice({
    name: "weekly",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getWeeklyList.pending, (state) => {
                state.action = {
                    weeklyResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getWeeklyList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    weeklyResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getWeeklyList.rejected, (state, action) => {
                state.weeklyResponse = {
                    weeklyResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const weeklyAction = weeklySlice.actions;
export default weeklySlice.reducer;