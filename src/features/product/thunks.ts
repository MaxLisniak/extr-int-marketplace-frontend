import { createAsyncThunk } from "@reduxjs/toolkit";
import { configuredAxios } from "../../axios/axios";

export const fetchProduct = createAsyncThunk
  ('product/fetchProduct', async (id: number) => {
    const product = await configuredAxios
      .get(`/products/${id}`);
    return product.data;
  })

export const fetchComments = createAsyncThunk
  ('product/fetchComments', async (id: number) => {
    const comments = await configuredAxios
      .get(`/comments/for-product/${id}`)
    return comments.data;
  })