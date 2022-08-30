import { createSlice } from "@reduxjs/toolkit";
import { createItem, deleteCategory, deleteCharacteristic, deleteCharacteristicName, deleteKeyword, deletePrice, deleteProduct, deleteSubcategory, fetchItems, updateCategory, updateCharacteristic, updateCharacteristicName, updateKeyword, updatePrice, updateProduct, updateSubcategory } from "./thunks";
import { AdminState } from "../types";

const initialState: AdminState = {
  products: [],
  categories: [],
  subcategories: [],
  characteristics: [],
  characteristic_names: [],
  prices: [],
  keywords: [],
  errorMessages: []
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
      .addCase(updateProduct.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.products.length; i++) {
          if (state.products[i].id === obj.id) {
            state.products[i] = obj;
          }
        }
      })
    builder
      .addCase(updateCategory.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.categories.length; i++) {
          if (state.categories[i].id === obj.id) {
            state.categories[i] = obj;
          }
        }
      })
    builder
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.subcategories.length; i++) {
          if (state.subcategories[i].id === obj.id) {
            state.subcategories[i] = obj;
          }
        }
      })
    builder
      .addCase(updateCharacteristic.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.characteristics.length; i++) {
          if (state.characteristics[i].id === obj.id) {
            state.characteristics[i] = obj;
          }
        }
      })
    builder
      .addCase(updateCharacteristicName.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.characteristic_names.length; i++) {
          if (state.characteristic_names[i].id === obj.id) {
            state.characteristic_names[i] = obj;
          }
        }
      })
    builder
      .addCase(updatePrice.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.prices.length; i++) {
          if (state.prices[i].id === obj.id) {
            state.prices[i] = obj;
          }
        }
      })
    builder
      .addCase(updateKeyword.fulfilled, (state, action) => {
        const obj = action.payload;
        for (let i = 0; i < state.keywords.length; i++) {
          if (state.keywords[i].id === obj.id) {
            state.keywords[i] = obj;
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
    builder
      .addCase(deleteCharacteristic.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedCharacteristics = state.characteristics
          .filter(item => {
            return item.id !== id;
          })
        state.characteristics = updatedCharacteristics;
      })
    builder
      .addCase(deleteCharacteristicName.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedCharacteristicNames = state.characteristic_names
          .filter(item => {
            return item.id !== id;
          })
        state.characteristic_names = updatedCharacteristicNames;
      })
    builder
      .addCase(deletePrice.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedPrices = state.prices
          .filter(item => {
            return item.id !== id;
          })
        state.prices = updatedPrices;
      })
    builder
      .addCase(deleteKeyword.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedKeywords = state.keywords
          .filter(item => {
            return item.id !== id;
          })
        state.keywords = updatedKeywords;
      })
    builder
      .addCase(createItem.fulfilled, (state, action) => {
        const obj = action.payload.item;
        const modelName = action.payload.modelName;
        state[modelName as keyof AdminState].unshift(obj)
      })
  }
})

export default adminSlice.reducer;