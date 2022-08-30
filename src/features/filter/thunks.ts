import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, Subcategory } from "../types";
import configuredAxios from "../../axios/axios";

export const fetchCategories = createAsyncThunk<
  Category[]
>
  ('filter/fetchCategories', async () => {
    const response = await configuredAxios
      .get('categories/extended/');
    return response.data;
  }
  )

export const fetchCharacteristicsForSubcategory = createAsyncThunk
  ('filter/fetchCharacteristicsForSubcategory', async (id: number) => {
    const response = await configuredAxios
      .get(`characteristic_names/by-subcategory-id/${id}`)
    return response.data;
  })

export const searchKeywordsAndProducts = createAsyncThunk
  ('filter/search', async (q: string) => {
    const keywords = await configuredAxios
      .get('keywords/search', {
        params: {
          q
        }
      });
    const products = await configuredAxios
      .get('products/search', {
        params: {
          q
        }
      });
    return { keywords: keywords.data, products: products.data };
  })

export const fetchProducts = createAsyncThunk
  ('filter/fetchProducts', async (payload: { activeCategory: Category, activeSubcategory: Subcategory }) => {
    const products = await configuredAxios
      .get("/products/explore", {
        params: {
          selectedCategoryName: payload.activeCategory?.name,
          selectedSubcategoryName: payload.activeSubcategory?.name
        },
      })
    return products.data
  })