import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../axios/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


export const refreshAccessToken = createAsyncThunk
  ('user/refreshAccessToken', async () => {
    console.log("refreshing token...")
    const response = axiosPrivate.get('/users/refresh')
    return (await response).data;
  })

// export const postComment = createAsyncThunk
//   ('user/postComment', async (payload: { productId: number, text: string, created: Date, userId: number }) => {
//     const axiosAuth = useAxiosPrivate();
//     console.log(axiosAuth);
//     const response = await axiosAuth.post('comments', {
//       product_id: payload.productId,
//       text: payload.text,
//       created: payload.created,
//       user_id: payload.userId
//     })

//   })

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