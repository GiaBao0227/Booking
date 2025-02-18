// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Lấy thông tin chi tiết phòng vé (gồm danh sách ghế)
export const fetchShowtimeDetail = createAsyncThunk(
  "booking/fetchShowtimeDetail",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      return result.data.content; // Dữ liệu này sẽ chứa thông tin ghế ngồi và phòng vé
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Xác nhận đặt vé
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyDatVe/DatVe", bookingData);
      return result.data.content; // Dữ liệu xác nhận đặt vé
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Lấy lịch chiếu của phim từ API QuanLyRap
export const fetchShowtimesByMovie = createAsyncThunk(
  "booking/fetchShowtimesByMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
      );
      return result.data.content; // Dữ liệu này sẽ chứa các hệ thống rạp, cụm rạp, lịch chiếu
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  showtimeDetail: null, // Chi tiết phòng vé (ghế ngồi)
  showtimes: null, // Lịch chiếu của phim
  selectedSeats: [], // Ghế ngồi đã chọn
  bookingStatus: null, // Trạng thái của việc đặt vé (thành công hay lỗi)
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.selectedSeats = [];
      state.bookingStatus = null;
    },
    addSelectedSeat: (state, action) => {
      const seatId = action.payload;
      if (!state.selectedSeats.includes(seatId)) {
        state.selectedSeats.push(seatId);
      }
    },
    removeSelectedSeat: (state, action) => {
      const seatId = action.payload;
      state.selectedSeats = state.selectedSeats.filter((id) => id !== seatId);
    },
  },
  extraReducers: (builder) => {
    // Fetch showtimes for the movie from QuanLyRap API
    builder.addCase(fetchShowtimesByMovie.fulfilled, (state, action) => {
      state.showtimes = action.payload;
    });

    // Fetch showtime details (seats) from QuanLyDatVe API
    builder.addCase(fetchShowtimeDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShowtimeDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.showtimeDetail = action.payload;
    });
    builder.addCase(fetchShowtimeDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Confirm booking
    builder.addCase(confirmBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookingStatus = "Booking successful!";
    });
    builder.addCase(confirmBooking.rejected, (state, action) => {
      state.loading = false;
      state.bookingStatus = "Booking failed. Please try again.";
      state.error = action.payload;
    });
  },
});

export const { resetBookingState, addSelectedSeat, removeSelectedSeat } =
  bookingSlice.actions;

export default bookingSlice.reducer;
