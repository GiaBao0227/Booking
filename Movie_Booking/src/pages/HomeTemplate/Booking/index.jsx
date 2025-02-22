import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchShowtimeDetail,
  confirmBooking,
  addSelectedSeat,
  removeSelectedSeat,
} from "./slice";
import "./style.scss";

export default function BookingPage() {
  const { id } = useParams(); // ID lịch chiếu
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    showtimeDetail,
    loading,
    selectedSeats,
    totalAmount,
    bookingStatus,
    error,
  } = useSelector((state) => state.booking || {});

  useEffect(() => {
    dispatch(fetchShowtimeDetail(id))
      .unwrap()
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, [dispatch, id]);

  // Xử lý chọn/bỏ chọn ghế
  const handleSelectSeat = (seat) => {
    if (seat.daDat) return; // Nếu ghế đã đặt, không thể chọn

    if (selectedSeats.some((s) => s.maGhe === seat.maGhe)) {
      dispatch(removeSelectedSeat(seat.maGhe));
    } else {
      dispatch(
        addSelectedSeat({ maGhe: seat.maGhe, giaVe: seat.giaVe || 75000 })
      ); // Giá mặc định 75.000 VND nếu không có giaVe
    }
  };

  // Xác nhận đặt vé
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế!");
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const taiKhoanNguoiDung = userInfo.taiKhoan || "user123"; // Dùng tài khoản từ localStorage hoặc mặc định

    const danhSachVe = selectedSeats.map((seat) => ({
      maGhe: seat.maGhe,
      giaVe: seat.giaVe,
    }));

    // Gọi API đặt vé
    dispatch(
      confirmBooking({
        maLichChieu: id,
        danhSachVe,
        taiKhoanNguoiDung,
      })
    )
      .unwrap()
      .then((response) => {
        alert("Đặt vé thành công!");
        console.log("API response:", response); // Log để kiểm tra phản hồi từ API
        navigate("/"); // Chuyển về trang chủ sau khi đặt vé thành công
      })
      .catch((err) => {
        const errorMessage = err || "Đặt vé thất bại. Vui lòng thử lại!";
        alert(`Lỗi: ${errorMessage}`);
        console.error("Lỗi đặt vé:", err); // Log lỗi để debug
      });
  };

  if (loading) {
    console.log("Loading is true, showing loading state");
    return <p className="text-center text-xl">Đang tải...</p>;
  }
  if (
    !showtimeDetail ||
    !showtimeDetail.danhSachGhe ||
    showtimeDetail.danhSachGhe.length === 0
  )
    return (
      <p className="text-center text-xl">
        Không tìm thấy thông tin lịch chiếu hoặc dữ liệu ghế.
      </p>
    );

  const { thongTinPhim, danhSachGhe } = showtimeDetail;

  // Tạo sơ đồ ghế 11 hàng, 12 cột
  const createSeatGrid = () => {
    const rows = 11; // 11 hàng
    const cols = 12; // 12 cột
    const seatGrid = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Điền ghế vào lưới dựa trên danhSachGhe
    danhSachGhe.forEach((seat) => {
      const row = parseInt(seat.tenGhe?.charAt(0)) - 1 || 0; // Lấy hàng (A=0, B=1, ...)
      const col = parseInt(seat.tenGhe?.slice(1) || seat.maGhe % 12 || 1) - 1; // Lấy cột (1-12)
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        seatGrid[row][col] = seat;
      }
    });

    return seatGrid;
  };

  const seatGrid = createSeatGrid();

  return (
    <div className="booking-container container mx-auto py-8 text-white">
      {/* Thông tin phim */}
      <div className="movie-info mb-8">
        <h1 className="movie-title text-3xl font-bold">
          {thongTinPhim.tenPhim}
        </h1>
        <p>
          <strong>Ngày chiếu:</strong> {thongTinPhim.ngayChieu} -{" "}
          {thongTinPhim.gioChieu}
        </p>
        <p>
          <strong>Cụm rạp:</strong> {thongTinPhim.tenCumRap}
        </p>
        <p>
          <strong>Rạp:</strong> {thongTinPhim.tenRap}
        </p>
      </div>

      {/* Sơ đồ ghế */}
      <div className="seat-selection">
        <h2 className="text-2xl font-semibold">Chọn ghế của bạn</h2>
        <div className="grid grid-cols-12 gap-2 mt-4">
          {seatGrid.map((row, rowIndex) =>
            row.map((seat, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`seat ${seat?.daDat ? "seat-booked" : ""} ${
                  selectedSeats.some((s) => s.maGhe === seat?.maGhe)
                    ? "seat-selected"
                    : seat?.loaiGhe === "Vip"
                    ? "seat-vip"
                    : ""
                }`}
                onClick={() => seat && handleSelectSeat(seat)}
                disabled={seat?.daDat}
              >
                {seat ? seat.tenGhe || seat.maGhe : ""}
              </button>
            ))
          )}
        </div>
        <div className="legend mt-4">
          <div className="flex gap-4 text-white">
            <span className="flex items-center">
              <div className="seat-booked w-6 h-6 mr-2"></div> Ghế đã đặt
            </span>
            <span className="flex items-center">
              <div className="seat-selected w-6 h-6 mr-2"></div> Ghế đang chọn
            </span>
            <span className="flex items-center">
              <div className="seat w-6 h-6 mr-2"></div> Ghế chưa đặt
            </span>
            <span className="flex items-center">
              <div className="seat-vip w-6 h-6 mr-2"></div> Ghế VIP
            </span>
          </div>
        </div>
      </div>

      {/* Danh sách ghế đã chọn */}
      <div className="selected-seats mt-6">
        <h2 className="text-xl font-semibold">Ghế đã chọn</h2>
        <div className="seat-list flex flex-wrap gap-2">
          {selectedSeats.map((seat) => (
            <span key={seat.maGhe} className="seat-badge">
              {seat.maGhe}
            </span>
          ))}
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="total-price mt-4">
        <h2 className="text-xl font-semibold">
          Tổng tiền: {totalAmount.toLocaleString()} VND
        </h2>
      </div>

      {/* Nút đặt vé */}
      <div className="booking-button mt-6">
        <button
          onClick={handleConfirmBooking}
          className="btn-confirm bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={selectedSeats.length === 0 || loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt vé"}
        </button>
      </div>

      {/* Trạng thái đặt vé hoặc lỗi */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {bookingStatus && (
        <p className="text-green-500 text-center mt-4">{bookingStatus}</p>
      )}
    </div>
  );
}
