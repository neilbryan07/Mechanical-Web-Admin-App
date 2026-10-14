import { createSlice } from "@reduxjs/toolkit"
import { getFilteredUser } from "./userThunk";

const initialState = {
    userFilterResponse: {
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

const userFilterSlice = createSlice({
    name: "userFilter",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredUser.pending, (state) => {
                state.action = {
                    userFilterResponse: {
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
            .addCase(getFilteredUser.fulfilled, (state, action) => {
                const list = action.payload;
                const pagination = state?.action?.userFilterResponse?.pagination;
                
                state.action = {
                    userFilterResponse: {
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
            .addCase(getFilteredUser.rejected, (state, action) => {
                state.userFilterResponse = {
                    userFilterResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const userAction = userFilterSlice.actions;
export default userFilterSlice.reducer;