import { createAsyncThunk } from "@reduxjs/toolkit";
import { configuredAxios } from "../../axios/axios";

export const fetchProduct = createAsyncThunk
  ('product/fetch', async (id: number) => {
    const product = await configuredAxios
      .get(`/products/${id}`);
    return product.data;
  })