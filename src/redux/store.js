import layoutSlice from "./Layout/layoutSlice";
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import estimaticsSlice from "./estimatics/estimaticsSlice";
import credentialsSlice from "./Credentials/credsSlice"
import customerSlice from "./customer/customerSlice";
import adjusterSlice from "./adjuster/adjusterSlice"
import estimatorSlice from "./estimator/estimatorSlice";
import regionSlice from "./region/regionSlice";
import shopSlice from "./shop/shopSlice";
import technicianSlice from "./technicians/technicianSlice";
import calendarSlice from "./calendar/calendarSlice";
import authSlice from "./auth/authSlice";
import auditorSlice from "./auditor/auditorSlice";
import loadingSlice from "./loading/loadingSlice";
import workfileSlice from "./estimatics/workfileSlice";
import assignmentShopSlice from "./estimatics/assignmentShopSlice";
import insuranceSice from "../redux/insurance/insuranceSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import userSlice from "./users/userSlice";
import stormLocationSlice from "./storm_location/stormLocationSlice";
import followupSlice from "./followup/followupSlice";
import weeklySlice from "./calendar/weeklySlice";
import monthlySlice from "./calendar/monthlySlice";
import shopAccountSlice from "./shop/shopAccountSlice";
import messageSlice from "./message/messsageSlice";

import { persistReducer, persistStore } from 'redux-persist';
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['navigation']
}

const reducer = combineReducers({
    layout: layoutSlice,
    loading: loadingSlice,
    estimatics: estimaticsSlice,
    auth: authSlice,
    token: credentialsSlice,
    shop: shopSlice,
    customer: customerSlice,
    adjuster: adjusterSlice,
    estimator: estimatorSlice,
    region: regionSlice,
    technician: technicianSlice,
    calendar: calendarSlice,
    auditor: auditorSlice,
    workfile: workfileSlice,
    shopEstimatic: assignmentShopSlice,
    insurance: insuranceSice,
    dashboard: dashboardSlice,
    userFilter: userSlice,
    stormLocation : stormLocationSlice,
    followup : followupSlice,
    weekly : weeklySlice,
    monthly : monthlySlice,
    shopAccount : shopAccountSlice,
    message : messageSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    // reducer: persistedReducer,
    reducer,
    devTools: true,
    middleware: [thunk]
})

export const persistor = persistStore(store)