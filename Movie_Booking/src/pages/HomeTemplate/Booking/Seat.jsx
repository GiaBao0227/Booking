import React from "react";
import classNames from "classnames";

const Seat = ({ seat, onSelectSeat, selectedSeats }) => {
  const isSelected = selectedSeats.some((s) => s === seat.maGhe);
  const isAvailable = !seat.daDat; // Kiểm tra ghế có thể chọn không
  const isVip = seat.loaiGhe === "Vip"; // Kiểm tra ghế VIP

  const handleSelect = () => {
    if (isAvailable) {
      onSelectSeat(seat.maGhe);
    }
  };

  return (
    <div
      className={classNames(
        "seat w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all text-white font-bold",
        {
          "seat-booked": !isAvailable, // Ghế đã đặt
          "seat-selected": isSelected, // Ghế đang chọn
          "seat-vip": isAvailable && !isSelected && isVip, // Ghế VIP chưa chọn
          "seat-available": isAvailable && !isSelected && !isVip, // Ghế thường chưa chọn
        }
      )}
      onClick={handleSelect}
      title={!isAvailable ? "Ghế đã được đặt" : ""}
    >
      {seat.tenGhe || seat.maGhe}
    </div>
  );
};

export default React.memo(Seat);
