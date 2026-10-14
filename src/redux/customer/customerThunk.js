import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";

export const getCustomerList = createAsyncThunk(
    'get/customer/list',
    async (value, thunkApi) => {
        try {

            const response = await APIServices.get({ url: '/clientele/list/all' });
            
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)