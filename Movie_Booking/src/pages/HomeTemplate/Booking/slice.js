import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Lấy thông tin chi tiết phòng vé (danh sách ghế)
export const fetchShowtimeDetail = createAsyncThunk(
  "booking/fetchShowtimeDetail",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      console.log("API response:", result.data);
      // Kiểm tra dữ liệu trả về
      if (!result.data.content) {
        throw new Error("Dữ liệu phòng vé không hợp lệ");
      }

      const content = result.data.content;
      // Tạo tenGhe từ maGhe nếu API không trả về tenGhe
      const enhancedDanhSachGhe = content.danhSachGhe.map((seat) => ({
        ...seat,
        tenGhe: seat.tenGhe || `A${seat.maGhe % 12 || 1}`, // Giả định tạo tenGhe (A1, A2, ..., B1, B2, ...)
      }));

      return {
        ...content,
        danhSachGhe: enhancedDanhSachGhe,
      };
    } catch (error) {
      return rejectWithValue(
        console.error("API error:", error)
        // error.response?.data?.message || "Lỗi tải dữ liệu"
      );
    }
  }
);

// Xác nhận đặt vé (sử dụng POST thay vì GET)
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (
    { maLichChieu, danhSachVe, taiKhoanNguoiDung },
    { rejectWithValue }
  ) => {
    try {
      const result = await api.post("/QuanLyDatVe/DatVe", {
        maLichChieu,
        danhSachVe,
        taiKhoanNguoiDung,
      });
      return result.data.content; // Dữ liệu xác nhận đặt vé
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi đặt vé");
    }
  }
);

const initialState = {
  loading: false,
  showtimeDetail: null, // Chi tiết phòng vé (ghế ngồi)
  selectedSeats: [], // [{ maGhe, giaVe }]
  totalAmount: 0, // Tổng tiền ghế đã chọn
  bookingStatus: null, // Trạng thái đặt vé
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.selectedSeats = [];
      state.totalAmount = 0;
      state.bookingStatus = null;
    },
    addSelectedSeat: (state, action) => {
      const seat = action.payload; // { maGhe, giaVe }
      if (!state.selectedSeats.some((s) => s.maGhe === seat.maGhe)) {
        state.selectedSeats.push(seat);
        state.totalAmount += seat.giaVe;
      }
    },
    removeSelectedSeat: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter(
        (s) => s.maGhe !== action.payload
      );
      state.totalAmount = state.selectedSeats.reduce(
        (sum, seat) => sum + seat.giaVe,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimeDetail = action.payload;
      })
      .addCase(fetchShowtimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
        state.bookingStatus = null;
      })
      .addCase(confirmBooking.fulfilled, (state) => {
        state.loading = false;
        state.bookingStatus = "Đặt vé thành công!";
        state.selectedSeats = [];
        state.totalAmount = 0;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.bookingStatus = "Đặt vé thất bại. Vui lòng thử lại!";
        state.error = action.payload;
      });
  },
});

export const { resetBookingState, addSelectedSeat, removeSelectedSeat } =
  bookingSlice.actions;

export default bookingSlice.reducer;
