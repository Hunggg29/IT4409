// --- TÌM KIẾM SẢN PHẨM ---
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Bắt sự kiện click nút "Tìm"
searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product-item");

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    if (name.includes(keyword)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
});

// Cho phép nhấn Enter trong ô tìm kiếm
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});

// --- ẨN / HIỆN FORM THÊM SẢN PHẨM ---
const addBtn = document.getElementById("addProductBtn");
const addForm = document.getElementById("addProductForm");

addBtn.addEventListener("click", () => {
  addForm.classList.toggle("hidden");
});

// --- XỬ LÝ THÊM SẢN PHẨM ---
addForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const desc = document.getElementById("newDesc").value.trim();

  if (!name || !price || isNaN(price) || Number(price) <= 0) {
    alert("Vui lòng nhập tên và giá hợp lệ!");
    return;
  }

  // Tạo phần tử sản phẩm mới
  const newItem = document.createElement("article");
  newItem.className = "product-item";
  newItem.innerHTML = `
    <h3>${name}</h3>
    <img src="https://via.placeholder.com/200x150" alt="${name}">
    <p>${desc}</p>
    <p><strong>Giá: ${price}₫</strong></p>
  `;

  // Thêm vào danh sách sản phẩm
  const productList = document.getElementById("product-list");
  productList.prepend(newItem);

  // Reset form
  addForm.reset();
  addForm.classList.add("hidden");
});
