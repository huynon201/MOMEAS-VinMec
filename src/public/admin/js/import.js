function render_xuat() {
  const tablebody = document.querySelector("#render-xuat tbody");

  // Kiểm tra `tablebody` có tồn tại không
  if (!tablebody) {
    console.error("Element #render-xuat tbody không tồn tại!");
    return;
  }

  // Gửi yêu cầu AJAX đến API để lấy danh sách sản phẩm
  fetch("/admin/api/products")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    })
    .then((listProduct) => {
      // Tạo hàng mới
      const row = document.createElement("tr");

      let productOptions = ""; // Biến lưu kết quả
      listProduct.forEach(function (products) {
        productOptions += `<li>${products.name}</li>`; // Thêm vào chuỗi kết quả
      });

      row.innerHTML = `
            <td>
            <fieldset>
              <input
                type="search"
                class="form-control producttb"
                name="name_producttb"
                placeholder="Chọn vật tư"
                required
              />
              <ul class="suggestions suggestionProduct">
                ${productOptions}
              </ul>
              </fieldset>
            </td>
            <td>
              <input id="so-luong-output" class="form-control" type="number" value="1" min="1" max="10" name="quantity">
            </td>
            <td>
              <button class="delete-btn btn btn-danger btn-sm">Xóa</button>
            </td>
          `;

      // Thêm hàng mới vào bảng
      tablebody.appendChild(row);

      // Xử lý sự kiện khi nhấn nút "Xóa"
      row.querySelector(".delete-btn").addEventListener("click", () => {
        tablebody.removeChild(row);
      });
    })
    .catch((error) => console.error("Error loading products:", error));
}
