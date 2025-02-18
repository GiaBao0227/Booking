import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

// Gọi API để lấy danh sách banner
export const fetchBanners = createAsyncThunk(
  "bannerPage/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("QuanLyPhim/LayDanhSachBanner?maNhom=GP01");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Trạng thái ban đầu
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Tạo slice
const bannerPageSlice = createSlice({
  name: "bannerPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerPageSlice.reducer;
