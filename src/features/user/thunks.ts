import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../axios/axios";

export const refreshAccessToken = createAsyncThunk
  ('user/refreshAccessToken', async () => {
    console.log("refreshing token...")
    const response = axiosPrivate.get('/users/refresh')
    return (await response).data;
  })

// const refresh = async () => {
//   console.log("refreshing token...")
//   const response = await axios.get('/users/refresh', {
//     withCredentials: true
//   });
//   setAuth(() => {
//     return { ...auth, accessToken: response.data.accessToken }
//   });
//   return response.data.accessToken;
// }
// return refresh;