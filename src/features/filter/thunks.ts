import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "./types";
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