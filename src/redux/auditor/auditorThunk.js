import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";

export const getAuditorList = createAsyncThunk(
    'get/auditor/list',
    async (value, thunkApi) => {
        try {

            const response = await APIServices.get({ url: '/user/list/all/auditor' });
      
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)