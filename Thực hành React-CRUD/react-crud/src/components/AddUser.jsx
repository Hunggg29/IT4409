import React, { useState } from "react";

export default function AddUser({ onAdd }) {
  // trạng thái mở/đóng modal thêm mới
  const [adding, setAdding] = useState(false);
  // state form người dùng
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  // cập nhật state theo từng input 
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      // cập nhật field trong address
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      // cập nhật field ở cấp 1 (name, username, email, ...)
      setUser({ ...user, [id]: value });
    }
  };

  // thêm user mới với kiểm tra tối thiểu và reset form
  const handleAdd = () => {
    if (!user.name || !user.username) {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user); // gửi user lên App để ResultTable thêm vào danh sách
    // reset form về trạng thái rỗng
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setAdding(false); // đóng modal sau khi thêm
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* nút mở modal thêm người dùng */}
      <button onClick={() => setAdding(true)}>Thêm</button>

      {/* modal thêm người dùng (hiện khi adding = true) */}
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm người dùng</h4>
            {/* các input controlled: giá trị lấy từ state user, onChange cập nhật lại state */}
            <input id="name" placeholder="Name" value={user.name} onChange={handleChange} />
            <input id="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input id="email" placeholder="Email" value={user.email} onChange={handleChange} />
            {/* city là thuộc tính trong user.address */}
            <input id="city" placeholder="City" value={user.address.city} onChange={handleChange} />
            {/* xác nhận thêm hoặc hủy bỏ (đóng modal) */}
            <button onClick={handleAdd}>Thêm</button>
            <button onClick={() => setAdding(false)}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}
