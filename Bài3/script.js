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
