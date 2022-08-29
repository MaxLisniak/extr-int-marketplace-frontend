import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../axios/axios";

export const fetchItems = createAsyncThunk
  ('admin/fetch', async (modelName: string) => {
    const response = await configuredAxios.get(modelName);
    return { items: response.data, modelName };
  })

export const updateProduct = createAsyncThunk
  ('admin/updateProduct', async (payload: { item: {}, id: number }) => {
    const response = await configuredAxios.patch(`products/${payload.id}`, payload.item);
    return response.data;
  })
export const updateCategory = createAsyncThunk
  ('admin/updateCategory', async (payload: { item: {}, id: number }) => {
    const response = await configuredAxios.patch(`categories/${payload.id}`, payload.item);
    return response.data;
  })
export const updateSubcategory = createAsyncThunk
  ('admin/updateSubcategory', async (payload: { item: {}, id: number }) => {
    const response = await configuredAxios.patch(`subcategories/${payload.id}`, payload.item);
    return response.data;
  })
export const updateCharacteristic = createAsyncThunk
  ('admin/updateCharacteristic', async (payload: { item: {}, id: number }) => {
    const response = await configuredAxios.patch(`characteristics/${payload.id}`, payload.item);
    return response.data;
  })
export const updateCharacteristicName = createAsyncThunk
  ('admin/updateCharacteristicName', async (payload: { item: {}, id: number }) => {
    console.log(payload)
    const response = await configuredAxios.patch(`characteristic_names/${payload.id}`, payload.item);
    return response.data;
  })
export const updatePrice = createAsyncThunk
  ('admin/updatePrice', async (payload: { item: {}, id: number }) => {
    console.log(payload)
    const response = await configuredAxios.patch(`prices/${payload.id}`, payload.item);
    return response.data;
  })
export const updateKeyword = createAsyncThunk
  ('admin/updateKeyword', async (payload: { item: {}, id: number }) => {
    console.log(payload)
    const response = await configuredAxios.patch(`keywords/${payload.id}`, payload.item);
    return response.data;
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
export const deleteCharacteristicName = createAsyncThunk
  ('admin/deleteCharacteristicName', async (id: number) => {
    const response = await configuredAxios.delete(`characteristic_names/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const deletePrice = createAsyncThunk
  ('admin/deletePrice', async (id: number) => {
    const response = await configuredAxios.delete(`prices/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const deleteKeyword = createAsyncThunk
  ('admin/deleteKeyword', async (id: number) => {
    const response = await configuredAxios.delete(`keywords/${id}`);
    if (response.data === "OK") {
      return id
    }
  })
export const createItem = createAsyncThunk
  ('admin/createItem', async (payload: { item: {}, modelName: string }) => {
    const response = await configuredAxios.post(`${payload.modelName}`, payload.item);
    return { item: response.data, modelName: payload.modelName };
  })