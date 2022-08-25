import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, deleteProduct, deleteSubcategory, fetchItems, updateItem } from "./thunks";
import { AdminState } from "./types";

const initialState: AdminState = {
  products: [],
  categories: [],
  subcategories: [],
  characteristics: [],
  characteristic_names: [],
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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedProducts = state.products
          .filter(item => {
            return item.id !== id;
          })
        state.products = updatedProducts;
      })
    builder
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedCategories = state.categories
          .filter(item => {
            return item.id !== id;
          })
        state.categories = updatedCategories;
      })
    builder
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedSubcategories = state.subcategories
          .filter(item => {
            return item.id !== id;
          })
        state.subcategories = updatedSubcategories;
      })
  }
})

export default adminSlice.reducer;