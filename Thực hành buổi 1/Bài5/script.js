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

const productList = document.getElementById("product-list");
//Lấy mảng sản phẩm từ localStorage hoặc khởi tạo mảng rỗng
let products = JSON.parse(localStorage.getItem("products")) || [];

getDataFromLocalStorage();

function getDataFromLocalStorage() {
  if(products && products.length > 0) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const item = document.createElement("article");
      item.className = "product-item";
      item.innerHTML = `
        <h3 class="product-name">${product.name}</h3>
        <img src="https://via.placeholder.com/400x200">
        <p class="product-desc">${product.desc}</p>
        <p class="product-price"><strong>Giá: ${product.price}₫</strong></p>
      `;
      // Thêm sản phẩm mới vào đầu danh sách
      productList.insertBefore(item, productList.firstChild);
    });
  } else {
    productList.innerHTML = 
    `<section id="product-list">

      <article class="product-item">
        <h3>Cà phê rang mộc</h3>
        <img src="https://rangxaycafe.com/wp-content/uploads/2023/10/hinh-anh-ca-phe-rang-moc.jpg" alt="Cà phê rang mộc">
        <p>Hương vị truyền thống, không pha trộn – dành cho người yêu cà phê nguyên bản.</p>
        <p><strong>Giá: 120.000₫</strong></p>
      </article>

      <article class="product-item">
        <h3>Cà phê hòa tan Mocha</h3>
        <img src="https://media.istockphoto.com/id/469320736/vi/anh/c%C3%A0-ph%C3%AA.jpg?s=612x612&w=0&k=20&c=DV9PuNUTrk5iUZmv-ZCIhPmVoq3jxNSTiBJK8PA_Gz8=" alt="Cà phê hòa tan">
        <p>Tiện lợi, thơm ngon – chỉ cần pha với nước nóng là có ngay ly cà phê chuẩn vị.</p>
        <p><strong>Giá: 80.000₫</strong></p>
      </article>

      <article class="product-item">
        <h3>Combo quà tặng Mocha House</h3>
        <img src="https://trungnguyenecoffee.com/wp-content/uploads/2021/07/Bo-qua-tang-EC.png" alt="Combo quà tặng cà phê">
        <p>Hộp quà sang trọng gồm cà phê, ly sứ và phụ kiện – món quà ý nghĩa cho người thân.</p>
        <p><strong>Giá: 250.000₫</strong></p>
      </article>
    </section>`
}}

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

  // Lưu sản phẩm mới vào localStorage
  products.push({name, price, desc});
  localStorage.setItem("products", JSON.stringify(products));

  getDataFromLocalStorage();

  // Reset form & ẩn đi
  addForm.reset();
  addForm.classList.add("hidden");
});

