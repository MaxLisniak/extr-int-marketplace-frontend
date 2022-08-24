import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, fetchItems, updateItem } from "./thunks";
import { AdminState } from "./types";

const initialState: AdminState = {
  products: [],
  categories: [],
  subcategories: [],
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        state[action.payload.modelName as keyof AdminState] =
          action.payload.items;
      })
    builder
      .addCase(updateItem.fulfilled, (state, action) => {
        const obj = action.payload.item;
        const modelName = action.payload.modelName;
        for (let i = 0; i < state[modelName as keyof AdminState].length; i++) {
          if (state[modelName as keyof AdminState][i].id === obj.id) {
            state[modelName as keyof AdminState][i] = obj;
          }
        }
      })
    builder
      .addCase(deleteItem.fulfilled, (state, action) => {
        const id = action.payload?.id;
        const modelName = action.payload?.modelName;
        state[modelName as keyof AdminState] =
          state[modelName as keyof AdminState]
            .filter(item => {
              return item.id !== id;
            })
      })
  }
})

export default adminSlice.reducer;