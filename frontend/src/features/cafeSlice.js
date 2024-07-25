import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCafes, createCafe } from "../services/cafeService";

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
      });
  },
});

export default cafeSlice.reducer;
