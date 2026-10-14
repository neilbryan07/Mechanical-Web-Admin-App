import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";

const baseRoute = '/user';

export const getMe = createAsyncThunk(
    'user/',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.get({ url: `${baseRoute}/profile/me` });

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

export const login = createAsyncThunk(
    'user/login',
    async (value, thunkApi) => {
        try {
            const result = await APIServices
                .post({
                    url: `${baseRoute}/login`,
                    payload: value
                });

            if (Array.isArray(result)) {
                const response = result?.filter(x => x !== undefined);

                if (response)
                    return response[0].response.data
            }

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
);

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.post({
                url: `dashboard${baseRoute}/forgot-password`,
                payload: value
            })

            if (Array.isArray(result)) {
                const response = result?.filter(x => x !== undefined);

                if (response)
                    return response[0].response.data
            }

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

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.post({
                url: `dashboard${baseRoute}/reset-password`,
                payload: value
            })

            if (Array.isArray(result)) {
                const response = result?.filter(x => x !== undefined);

                if (response)
                    return response[0].response.data
            }

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

export const createAccount = createAsyncThunk(
    'user/add/admin',
    async (value, thunkApi) => {
        try {
            const result = await APIServices.post({
                url: `${baseRoute}/add/admin`,
                payload: value
            });

            return result?.response?.data ?
                result?.response?.data :
                result?.data?.data;
        } catch (error) {
            return thunkApi
                .rejectWithValue({
                    error: error.data,
                    status: error.status
                })
        }
    }
);
