import React, { useEffect, useState } from "react";

export default function ResultTable({ keyword, user, onAdded }) {
  // state cục bộ của component
  const [users, setUsers] = useState([]);        // Danh sách người dùng hiển thị trên bảng
  const [editing, setEditing] = useState(null);  // Người dùng đang được chỉnh sửa (null nếu không sửa)
  const [loading, setLoading] = useState(true);  // Trạng thái tải dữ liệu ban đầu

  // gọi API lấy dữ liệu khi component mount (chạy 1 lần do deps rỗng [])
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);        // lưu danh sách vào state
        setLoading(false);     // tắt trạng thái loading sau khi có dữ liệu
      });
  }, []);

  // khi có user mới từ AddUser → thêm vào danh sách rồi gọi onAdded() để cha reset state user
  useEffect(() => {
    if (user) {
      // tạo id tạm dựa trên độ dài hiện tại (vì API giả không trả id mới)
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded(); // báo cho component cha rằng đã xử lý xong (tránh thêm lặp)
    }
  }, [user]);

  // các chức năng CRUD còn lại
  /** xóa người dùng theo id */
  const removeUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));
  /** chuyển sang chế độ sửa: clone đối tượng để chỉnh trên bản sao */
  const editUser = (u) => setEditing({ ...u, address: { ...u.address } });
  /** cập nhật giá trị thuộc tính đang sửa (controlled input) */
  const handleEditChange = (field, value) =>
    setEditing((prev) => ({ ...prev, [field]: value }));
  /** lưu thay đổi: ghi đè phần tử có id trùng với editing.id, rồi thoát chế độ sửa */
  const saveUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };

  // lọc danh sách theo từ khóa (không phân biệt hoa thường)
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // hiển thị trạng thái đang tải dữ liệu ban đầu
  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div>
      {/* form sửa user (hiện khi editing != null). đây là modal đơn giản dựng bằng div */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Sửa người dùng</h3>
            {/* trường name (controlled input): giá trị lấy từ state editing, thay đổi qua handleEditChange */}
            <input
              type="text"
              value={editing.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            {/* trường username (controlled input) */}
            <input
              type="text"
              value={editing.username}
              onChange={(e) => handleEditChange("username", e.target.value)}
            />
            {/* nút lưu sẽ cập nhật danh sách và đóng modal; nút hủy chỉ đóng modal */}
            <button onClick={saveUser}>Lưu</button>
            <button onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </div>
      )}

      {/* bảng hiển thị danh sách người dùng đã lọc theo keyword */}
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            {/* các cột thông tin cơ bản của user */}
            <th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>City</th><th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* lặp qua danh sách đã lọc; nhớ đặt key duy nhất để React tối ưu render */}
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              {/* truy cập city trong object address */}
              <td>{u.address.city}</td>
              <td>
                {/* thao tác: chuyển sang sửa hoặc xóa người dùng */}
                <button onClick={() => editUser(u)}>Sửa</button>
                <button onClick={() => removeUser(u.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
