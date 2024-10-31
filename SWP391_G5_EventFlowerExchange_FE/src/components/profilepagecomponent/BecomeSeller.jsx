import React from "react";
import axios from "axios";

const BecomeSeller = ({ setError }) => {
  const handleBecomeSeller = async () => {
    try {
      // Retrieve the user from localStorage and extract userID
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.userID) {
        setError('Không thể tìm thấy ID người dùng. Vui lòng đăng nhập lại.');
        return;
      }

      const userID = user.userID;

      // Send notification to admin about the seller request
      const notificationData = {
        content: "Tôi muốn làm seller, bạn hãy thêm role cho tôi",
        notificationType: "setSeller",
        user: {
          userID: userID
        }
      };

      const response = await axios.post(`http://localhost:8080/identity/noti/`, notificationData);

      if (response.status === 201) {
        alert('Yêu cầu trở thành người bán hàng của bạn đã được gửi đến quản trị viên.');
      }
    } catch (error) {
      console.error('Error sending seller request notification:', error);
      setError('Có lỗi xảy ra khi gửi yêu cầu trở thành người bán hàng.');
    }
  };

  return (
    <div className="become-seller-container">
      <h2>Bạn có muốn trở thành người bán hàng không?</h2>
      <p>Khi xác nhận, yêu cầu của bạn sẽ được gửi đến quản trị viên.</p>
      <button className="confirm-seller-button" onClick={handleBecomeSeller}>
        Xác nhận
      </button>
    </div>
  );
};

export default BecomeSeller;
