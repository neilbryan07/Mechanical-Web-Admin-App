import { createSlice } from "@reduxjs/toolkit"
import { getTechnicianList } from "./technicianThunk";

const initialState = {
    technicianResponse: {
        loading: true,
        status: "pending",
        data: [],
        error: {},
    },
}

const technicianSlice = createSlice({
    name: "technician",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTechnicianList.pending, (state) => {
                state.action = {
                    technicianResponse: {
                        loading: true,
                        status: "pending",
                        data: [],
                    }
                };
            })
            .addCase(getTechnicianList.fulfilled, (state, action) => {
                const list = action.payload;
             
                state.action = {
                    technicianResponse: {
                        loading: false,
                        status: "fulfilled",
                        data: list,
                    }
                };
            })
            .addCase(getTechnicianList.rejected, (state, action) => {
                state.technicianResponse = {
                    technicianResponse: {
                        loading: false,
                        status: "rejected",
                        error: action.payload,
                    }
                };
            })
    }
});

export const technicianAction = technicianSlice.actions;
export default technicianSlice.reducer;