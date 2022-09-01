import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../axios/axios";


export const refreshAccessToken = createAsyncThunk
  ('user/refreshAccessToken', async () => {
    const response = axiosPrivate.get('/users/refresh')
    return (await response).data;
  })

export const fetchFavorites = createAsyncThunk
  ('user/fetchFavorites', async (payload: { user_id: number, axios: any }) => {
    const products = await payload.axios.get('favorites/for-user', {
      params: {
        user_id: payload.user_id
      }
    })
    console.log(products)
    return products.data;
  })
