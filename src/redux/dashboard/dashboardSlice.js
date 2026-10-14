import { createSlice } from "@reduxjs/toolkit"
import { getScopeDashboard, getWebData } from "./dashboardThunk"

const initialState = {
    scopeDashboardLoading: false,
    scopeDashboardStatus: "pending",
    scopeDashboardError: undefined,
    scopeDashboard: undefined,
    scopeDashboardList: [],

    webDataLoading: false,
    webDataStatus: 'pending',
    webDataError: undefined,
    webData: undefined,
    webDataList: []
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setScopeDashboardList: (state, action) => {
            state.scopeDashboardList = action.payload;
        },
        setWebDataList: (state, action) => {
            state.webDataList = action.payload;
        },
    },
    extraReducers: (builder) => {
        //-----------------------------Start Get Scoped Dashboard-----------------------------
        builder
            .addCase(getScopeDashboard.pending, (state, action) => {
                state.scopeDashboardStatus = "pending";
                state.scopeDashboardLoading = true;
                state.scopeDashboardError = undefined;
                state.scopeDashboard = undefined;
                state.scopeDashboardList = undefined;
            })
            .addCase(getScopeDashboard.fulfilled, (state, action) => {
                state.scopeDashboardStatus = "fulfilled";
                state.scopeDashboardLoading = false;
                state.scopeDashboardError = undefined;
                state.scopeDashboard = action.payload
            })
            .addCase(getScopeDashboard.rejected, (state, action) => {
                state.scopeDashboardStatus = "rejected";
                state.scopeDashboardLoading = false;
                state.scopeDashboardError = action.payload
                state.scopeDashboard = undefined;
                state.scopeDashboardList = undefined;
            });
        //-----------------------------End Get Scoped Dashboard-----------------------------
        //-----------------------------Start Get Web Data-----------------------------
        builder
            .addCase(getWebData.pending, (state, action) => {
                state.webDataStatus = "pending";
                state.webDataLoading = true;
                state.webDataError = undefined
                state.webDataList = undefined;
            })
            .addCase(getWebData.fulfilled, (state, action) => {
                state.webDataStatus = "fulfilled";
                state.webDataLoading = false;
                state.webDataError = undefined
                state.webData = action.payload;
            })
            .addCase(getWebData.rejected, (state, action) => {
                state.webDataStatus = "rejected";
                state.webDataLoading = false;
                state.webDataError = action.payload
                state.webDataList = undefined;
            });
        //-----------------------------End Get Web Data-----------------------------

    }
});

export const dashboardAction = dashboardSlice.actions;
export default dashboardSlice.reducer;