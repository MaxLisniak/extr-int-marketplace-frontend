import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../axios/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export const refreshAccessToken = createAsyncThunk
  ('user/refreshAccessToken', async () => {
    const response = axiosPrivate.get('/users/refresh')
    return (await response).data;
  })

