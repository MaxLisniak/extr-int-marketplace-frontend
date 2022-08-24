import { createAsyncThunk } from "@reduxjs/toolkit";
import configuredAxios from "../../axios/axios";

export const fetchItems = createAsyncThunk
  ('admin/fetch', async (modelName: string) => {
    const response = await configuredAxios.get(modelName);
    return { items: response.data, modelName };
  }
  )

export const updateItem = createAsyncThunk
  ('admin/update', async (payload: { item: {}, modelName: string, id: number }) => {
    const response = await configuredAxios.patch(`${payload.modelName}/${payload.id}`, payload.item);
    return { item: response.data, modelName: payload.modelName };
  }
  )

export const deleteItem = createAsyncThunk
  ('admin/delete', async (payload: { modelName: string, id: number }) => {
    const response = await configuredAxios.delete(`${payload.modelName}/${payload.id}`);
    if (response.data === "OK") {
      return { id: payload.id, modelName: payload.modelName }
    }
  }
  )
