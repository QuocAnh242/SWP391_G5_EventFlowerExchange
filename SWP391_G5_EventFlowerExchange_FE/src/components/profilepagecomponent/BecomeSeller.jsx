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

      // Send request to update user role to 'Seller'
      const response = await axios.put(`http://localhost:8080/identity/users/seller/${userID}`);
      
      if (response.status === 200) {
        alert('Bạn đã trở thành người bán hàng thành công!');

        // Update the user role in localStorage
        const updatedUser = { ...user, role: 'SELLER' };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Redirect to the seller dashboard
        window.location.href = "/seller-dashboard";
      }
    } catch (error) {
      console.error('Error becoming seller:', error);
      setError('Có lỗi xảy ra khi chuyển sang vai trò người bán hàng.');
    }
  };

  return (
    <div className="become-seller-container">
      <h2>Bạn có muốn trở thành người bán hàng không?</h2>
      <p>Khi xác nhận, tài khoản của bạn sẽ chuyển sang vai trò người bán hàng.</p>
      <button className="confirm-seller-button" onClick={handleBecomeSeller}>
        Xác nhận
      </button>
    </div>
  );
};

export default BecomeSeller;
