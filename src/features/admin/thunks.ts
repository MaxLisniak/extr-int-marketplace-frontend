import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../axios/axios";

export const fetchItems = createAsyncThunk
  ('admin/fetch', async (modelName: string) => {
    const response = await configuredAxios.get(modelName);
    return { items: response.data, modelName };
  })

export const updateItem = createAsyncThunk
  ('admin/update', async (payload: { item: {}, modelName: string, id: number }) => {
    const response = await configuredAxios.patch(`${payload.modelName}/${payload.id}`, payload.item);
    return { item: response.data, modelName: payload.modelName };
  })

export const deleteProduct = createAsyncThunk
  ('admin/deleteProduct', async (id: number) => {
    const response = await configuredAxios.delete(`products/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const deleteCategory = createAsyncThunk
  ('admin/deleteCategory', async (id: number) => {
    const response = await configuredAxios.delete(`categories/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const deleteSubcategory = createAsyncThunk
  ('admin/deleteSubcategory', async (id: number) => {
    const response = await configuredAxios.delete(`subcategories/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const deleteCharacteristic = createAsyncThunk
  ('admin/deleteCharacteristic', async (id: number) => {
    const response = await configuredAxios.delete(`characteristics/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
