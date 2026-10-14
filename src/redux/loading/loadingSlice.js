import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageLoading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.pageLoading = action.payload;
    },
  },
});

export const loadingAction = loadingSlice.actions;

export default loadingSlice.reducer;
