// Tìm kiếm sản phẩm 
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Bắt sự kiện click nút "Tìm"
searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product-item");

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    if (name.includes(keyword)) {
      product.style.display = ""; // hiển thị lại theo CSS gốc
    } else {
      product.style.display = "none"; // ẩn sản phẩm không khớp
    }
  });
});

// Cho phép nhấn Enter trong ô tìm kiếm
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchBtn.click();
});


// Ẩn/hiện form thêm sản phẩm sau khi bấm nút "Thêm sản phẩm"
const addBtn = document.getElementById("addProductBtn");
const addForm = document.getElementById("addProductForm");

addBtn.addEventListener("click", () => {
  addForm.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", () => {
  addForm.classList.add("hidden");
  addForm.reset();
  errorMsg.textContent = "";
});


//Xử lý sau khi submit form thêm sản phẩm
addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("newName").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const desc = document.getElementById("newDesc").value.trim();

  // Validate dữ liệu
  if (!name || !price || isNaN(price) || Number(price) <= 0) {
    errorMsg.textContent = "Vui lòng nhập tên và giá hợp lệ!";
    return;
  }

  // Xóa thông báo lỗi
  errorMsg.textContent = "";

  // Tạo phần tử sản phẩm mới
  const newItem = document.createElement("article");
  newItem.className = "product-item";
  newItem.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <img src="https://via.placeholder.com/400x200">
    <p class="product-desc">${desc}</p>
    <p class="product-price"><strong>Giá: ${price}₫</strong></p>
  `;

  // Thêm sản phẩm mới vào đầu danh sách
  const productList = document.getElementById("product-list");
  productList.insertBefore(newItem, productList.firstChild);

  // Reset form & ẩn đi
  addForm.reset();
  addForm.classList.add("hidden");
});

