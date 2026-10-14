import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIServices } from "../../hooks/fetchAPI";
import ObjectDeserializer from "../../utils/object-to-params";

export const getFollowUpList = createAsyncThunk(
    'get/follow-up/list',
    async (value, thunkApi) => {
        try {

            const { objectToParams } = ObjectDeserializer;

            const response = await APIServices.get({ url: `/followup/list/filter?${objectToParams(value)}`});
            
            return response.data.data;
        } catch (error) {
            return thunkApi.rejectWithValue({ error: error.data, status: error.status });
        }
    }
)