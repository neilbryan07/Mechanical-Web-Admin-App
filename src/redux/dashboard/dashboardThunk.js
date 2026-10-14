import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";

const baseRoute = '/dashboard';

export const getScopeDashboard = createAsyncThunk(
    'getScopeDashboard',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.get({ url: `${baseRoute}/get-scope-dashboard` });

            return result?.response?.data ?
                result?.response?.data :
                result?.data?.data;
        } catch (error) {
            return thunkApi
                .rejectWithValue({
                    error: error.data,
                    status: error.status
                });
        }
    }
)

export const getWebData = createAsyncThunk(
    'getWebData',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.get({ url: `${baseRoute}/get-web-data` });

            return result?.response?.data ?
                result?.response?.data :
                result?.data?.data;
        } catch (error) {
            return thunkApi
                .rejectWithValue({
                    error: error.data,
                    status: error.status
                });
        }
    }
)