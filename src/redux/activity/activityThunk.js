import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";
import ObjectDeserializer from "../../utils/object-to-params";

export const getFilteredUser = createAsyncThunk(
    'get/userFilter/user',
    async (value, thunkApi) => {
        try {
            const { objectToParams } = ObjectDeserializer;
            
            const response = await APIServices.get({ url: `workfile/list/65fed4eb2125c22c554f228f/filter/activity?page=1&limit=10`});
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)