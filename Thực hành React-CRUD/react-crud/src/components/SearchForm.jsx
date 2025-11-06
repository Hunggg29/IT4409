// props: onChangeValue(value: string): callback gửi giá trị nhập lên component cha (App)
// gọi onChangeValue mỗi lần người dùng gõ để lọc realtime
export default function SearchForm({ onChangeValue }) {
  return (
    <input
      type="text"
      placeholder="Tìm theo name, username"
      onChange={(e) => onChangeValue(e.target.value)} // gửi dữ liệu lên App
      style={{ padding: "5px", marginBottom: "10px", width: "250px" }}
    />
  );
}
