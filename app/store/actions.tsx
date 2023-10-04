import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "../services/api"
import { AuthenticationStoreModel } from "../models/AuthenticationStore"


export const fetchAssets = createAsyncThunk('asset/fetchAssets', async (accessToken) => {
  try {

    const response = await api.post("http://192.168.88.62:4012/assets/listWithQuery", {
      offsetPaginationOptions: {
        limit: 10,
        offset: 0,
      },
      query: {
        field: 'version',
        operator: '>',
        value: 5,
      },
    }, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmEiLCJpYXQiOjE2OTY0MTg5MjksImV4cCI6MTY5NjUwNTMyOX0.I2CPNzoWy0iWz2NZLhsVGRjd2VhO40vqXsD_1LdOZbM`,
      }
    });

   console.log("İLK",response.data.results[0])

    return response.data;
  } catch (error) {
    throw error;
  }
});
