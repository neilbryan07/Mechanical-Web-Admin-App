import { createSlice } from "@reduxjs/toolkit"
import { getMessage } from "./messageThunk";

const initialState = {
    messageResponse: {
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

const messageSlice = createSlice({
    name: "messageFilter",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getMessage.pending, (state) => {
                state.action = {
                    messageResponse: {
                        loading: true,
                        status: "pending",
                    }
                };
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                const list = action.payload;

                state.action = {
                    messageResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list.data,
                    }
                };
            })
            .addCase(getMessage.rejected, (state, action) => {
                state.messageResponse = {
                    messageResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const messageAction = messageSlice.actions;
export default messageSlice.reducer;