// Component thêm người dùng mới
// - Props:
//   + onAdd(user): callback gửi user mới lên component cha (App)
// - Hành vi:
//   + Bấm "Thêm" mở modal, nhập thông tin và xác nhận để đẩy user lên cha
//   + Sau khi thêm, reset form và đóng modal
import React, { useState } from "react";

export default function AddUser({ onAdd }) {
  // Trạng thái mở/đóng modal thêm mới
  const [adding, setAdding] = useState(false);
  // State form người dùng; lưu ý address là object lồng nhau
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  // Cập nhật state theo từng input (hỗ trợ cả trường lồng trong address)
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      // Cập nhật field trong address
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      // Cập nhật field ở cấp 1 (name, username, email, ...)
      setUser({ ...user, [id]: value });
    }
  };

  // Thêm user mới với kiểm tra tối thiểu và reset form
  const handleAdd = () => {
    if (!user.name || !user.username) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user); // Gửi user lên App để ResultTable thêm vào danh sách
    // Reset form về trạng thái rỗng
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setAdding(false); // Đóng modal sau khi thêm
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Nút mở modal thêm người dùng */}
      <button onClick={() => setAdding(true)}>Thêm</button>

      {/* Modal thêm người dùng (hiện khi adding = true) */}
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>
            {/* Các input controlled: giá trị lấy từ state user, onChange cập nhật lại state */}
            <input id="name" placeholder="Name" value={user.name} onChange={handleChange} />
            <input id="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input id="email" placeholder="Email" value={user.email} onChange={handleChange} />
            {/* City là thuộc tính trong user.address */}
            <input id="city" placeholder="City" value={user.address.city} onChange={handleChange} />
            {/* Xác nhận thêm hoặc hủy bỏ (đóng modal) */}
            <button onClick={handleAdd}>Thêm</button>
            <button onClick={() => setAdding(false)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}
