import { createSlice } from "@reduxjs/toolkit"
import { getShopList } from "./shopThunk";

const initialState = {
    shopResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getShopList.pending, (state) => {
                state.action = {
                    shopResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getShopList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    shopResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getShopList.rejected, (state, action) => {
                state.shopResponse = {
                    shopResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const shopAction = shopSlice.actions;
export default shopSlice.reducer;