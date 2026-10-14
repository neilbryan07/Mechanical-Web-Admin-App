import { createSlice } from "@reduxjs/toolkit"
import { getCustomerList } from "./customerThunk";

const initialState = {
    customerResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerList.pending, (state) => {
                state.action = {
                    customerResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getCustomerList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    customerResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getCustomerList.rejected, (state, action) => {
                state.customerResponse = {
                    customerResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const customerAction = customerSlice.actions;
export default customerSlice.reducer;