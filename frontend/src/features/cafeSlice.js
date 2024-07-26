import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
} from "../services/cafeService";

export const fetchCafes = createAsyncThunk(
  "cafes/fetchCafes",
  async (location) => {
    const response = await getCafes(location);
    return response;
  }
);

export const addCafe = createAsyncThunk("cafes/addCafe", async (cafeData) => {
  const response = await createCafe(cafeData);
  return response;
});

export const updateCafeValues = createAsyncThunk(
  "cafes/updateCafe",
  async (id, cafeData) => {
    const response = await updateCafe(id, cafeData);
    return response;
  }
);

export const deleteCafeObject = createAsyncThunk(
  "cafes/deleteCafe",
  async (id) => {
    await deleteCafe(id);
    return id;
  }
);

const cafeSlice = createSlice({
  name: "cafes",
  initialState: {
    cafes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCafes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cafes = action.payload;
      })
      .addCase(fetchCafes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCafe.fulfilled, (state, action) => {
        state.cafes.push(action.payload);
      })
      .addCase(addCafe.fulfilled, (state, action) => {
        state.cafes.push(action.payload);
      })
      .addCase(updateCafe.fulfilled, (state, action) => {
        const index = state.cafes.findIndex(
          (cafe) => cafe.id === action.payload.id
        );
        if (index !== -1) {
          state.cafes[index] = action.payload;
        }
      })
      .addCase(deleteCafeObject.fulfilled, (state, action) => {
        state.cafes = state.cafes.filter((cafe) => cafe.id !== action.payload);
      });
  },
});

export default cafeSlice.reducer;
