import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Lấy thông tin chi tiết phim
export const fetchDetailMovie = createAsyncThunk(
  "detailMovie/fetchDetailMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Lấy lịch chiếu của phim đó
export const fetchShowtimesByMovie = createAsyncThunk(
  "detailMovie/fetchShowtimesByMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  showtimes: null,
  error: null,
};

const detailMovieSlice = createSlice({
  name: "detailMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetailMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDetailMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchShowtimesByMovie.fulfilled, (state, action) => {
      state.showtimes = action.payload;
    });
  },
});

export default detailMovieSlice.reducer;
