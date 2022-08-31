import { createSlice } from "@reduxjs/toolkit"
import { fetchProduct } from "./thunks";
import { Product } from "../types";

const initialState = {
  product: {} as Product,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
  }
})

// export const {
// } = productSlice.actions;

export default productSlice.reducer;