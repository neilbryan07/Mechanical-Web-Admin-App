import { createSlice } from "@reduxjs/toolkit"
import { getCalendarList } from "./calendarThunk";

const initialState = {
    calendarResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCalendarList.pending, (state) => {
                state.action = {
                    calendarResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getCalendarList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    calendarResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getCalendarList.rejected, (state, action) => {
                state.calendarResponse = {
                    calendarResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const calendarAction = calendarSlice.actions;
export default calendarSlice.reducer;