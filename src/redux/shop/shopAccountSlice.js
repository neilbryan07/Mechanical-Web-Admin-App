import { createSlice } from "@reduxjs/toolkit"
import { getShopAccountList } from "./shopAccountThunk";

const initialState = {
    shopAccountResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const shopAccountSlice = createSlice({
    name: "shopAccount",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getShopAccountList.pending, (state) => {
                state.action = {
                    shopAccountResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getShopAccountList.fulfilled, (state, action) => {
                const list = action.payload;
                const pagination = state?.action?.shopAccountResponse?.pagination;
             
                state.action = {
                    shopAccountResponse: {
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
            .addCase(getShopAccountList.rejected, (state, action) => {
                state.shopAccountResponse = {
                    shopAccountResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const shopAccountAction = shopAccountSlice.actions;
export default shopAccountSlice.reducer;