import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  loading: false,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      getProductLoading: (state, action) => {
        state.loading = true;
      },
      getProductSuccess: (state, action) => {
        state.loading = false;
        state.product = action.payload;
      },
    },
});

export const { getProductLoading, getProductSuccess } = productSlice.actions;

export default productSlice.reducer;