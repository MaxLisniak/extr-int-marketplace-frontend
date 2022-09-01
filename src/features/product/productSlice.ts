import { createSlice } from "@reduxjs/toolkit"
import { fetchComments, fetchProduct } from "./thunks";
import { Product } from "../types";
import { access } from "fs";

const initialState = {
  product: {} as Product,
  comments: [],
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
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
  }
})

// export const {
// } = productSlice.actions;

export default productSlice.reducer;