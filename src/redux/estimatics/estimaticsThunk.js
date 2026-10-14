import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";
import ObjectDeserializer from "../../utils/object-to-params";

export const getFilteredEstimatic = createAsyncThunk(
    'get/filter/estimatic',
    async (value, thunkApi) => {
        try {
            const { objectToParams } = ObjectDeserializer;
            
            // const response = await APIServices.get({ url: `/workfile/list/filter?${objectToParams(value)}` });
            const response = await APIServices.get({ url: `/workfile/list/assignment/filter?is_shop=false&${objectToParams(value)}` });
   
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)