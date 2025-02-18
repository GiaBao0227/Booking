import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchShowtimes = createAsyncThunk(
  "showtimes/fetchShowtimes",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP02"
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const showtimesSlice = createSlice({
  name: "showtimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default showtimesSlice.reducer;
