import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = false;
    },
  },
});

export default siteSlice.reducer;

export const { setIsLoading } = siteSlice.actions;
