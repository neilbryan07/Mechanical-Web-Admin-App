import { createSlice } from "@reduxjs/toolkit"
import { getFilteredShopEstimatic } from "./assignmentShopThunk";

const initialState = {
    shopEstimaticResponse: {
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

const shopEstimaticSlice = createSlice({
    name: "shopEstimatic",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredShopEstimatic.pending, (state) => {
                state.action = {
                    shopEstimaticResponse: {
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
            .addCase(getFilteredShopEstimatic.fulfilled, (state, action) => {
                const list = action.payload;
                const pagination = state?.action?.shopEstimaticResponse?.pagination;
                
                state.action = {
                    shopEstimaticResponse: {
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
            .addCase(getFilteredShopEstimatic.rejected, (state, action) => {
                state.shopEstimaticResponse = {
                    shopEstimaticResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const shopEstimaticAction = shopEstimaticSlice.actions;
export default shopEstimaticSlice.reducer;