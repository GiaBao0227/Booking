import React from "react";
// import "./Modal.scss";

const Modal = ({ isOpen, onClose, bookingInfo, onContinue, onHome }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thông tin đặt vé</h2>
        <p>
          <strong>Phim:</strong> {bookingInfo.movieName}
        </p>
        <p>
          <strong>Cụm rạp:</strong> {bookingInfo.cinema}
        </p>
        <p>
          <strong>Thời gian:</strong> {bookingInfo.showtime}
        </p>
        <p>
          <strong>Ghế:</strong> {bookingInfo.seats.join(", ")}
        </p>
        <p>
          <strong>Email:</strong> {bookingInfo.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {bookingInfo.phone}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {bookingInfo.totalPrice} đ
        </p>

        <div className="modal-actions">
          <button onClick={onContinue} className="btn btn-primary">
            Mua thêm vé
          </button>
          <button onClick={onHome} className="btn btn-secondary">
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
