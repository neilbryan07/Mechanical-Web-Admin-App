import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";
import ObjectDeserializer from "../../utils/object-to-params";
import SingleDeserializer from "../../utils/Single-params";

export const getMessage = createAsyncThunk(
    'get/message/workfile',
    async (value, thunkApi) => {
        try {
            const { objectToParams } = SingleDeserializer;
            
            const response = await APIServices.get({ url: `/workfile/list/675737e6cf3490e239c20faf/message`});
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)