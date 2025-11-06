import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import AddUser from "./components/AddUser";
import ResultTable from "./components/ResultTable";

function App() {
  const [kw, setKeyword] = useState("");        
  const [newUser, setNewUser] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý người dùng</h1>
      {/* từ SearchForm → App: mỗi lần gõ sẽ gọi onChangeValue(value) → setKeyword(value) */}
      <SearchForm onChangeValue={setKeyword} />

      {/* từ AddUser → App: khi bấm Thêm sẽ gọi onAdd(user) → setNewUser(user)
             App giữ user tạm thời để ResultTable biết có user mới */}
      <AddUser onAdd={setNewUser} />

      {/* App -> ResultTable: truyền
            - keyword: dùng để lọc danh sách hiển thị
            - user: user mới vừa được thêm (có thể null nếu không có)
            - onAdded: callback để ResultTable báo đã xử lý xong user mới
              -> App sẽ setNewUser(null) nhằm tránh thêm lặp lại */}
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;
