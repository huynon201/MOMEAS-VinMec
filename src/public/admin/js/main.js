const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
const columContent = document.querySelector(".colum-content");

// Function to handle window resize
const handleResize = () => {
  if (window.innerWidth < 800) {
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("close");
    sidebar.classList.add("locked");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
    if (!sidebar.classList.contains("locked")) {
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
  }
};

window.addEventListener("resize", handleResize);

//erorr

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  }
};

// Function to show the sidebar when the mouse enters
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to toggle the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

handleResize();
// main

function attachDeleteListeners() {
  document.querySelectorAll(".xoa").forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa popover hiện có (nếu có) để tránh trùng lặp
      const existingPopover = document.querySelector(".popover");
      if (existingPopover) {
        existingPopover.remove();
      }

      // Tạo một bản sao của `#confirmDelete` để đảm bảo mỗi popover là độc lập
      const popoverContent = document
        .getElementById("confirmDelete")
        .cloneNode(true);
      popoverContent.classList.remove("d-none");
      popoverContent.id = ""; // Xóa ID để tránh xung đột ID khi có nhiều popover

      // Thêm popover content vào body
      document.body.appendChild(popoverContent);

      // Tạo popover cho nút "Xóa" được nhấn
      const popover = new bootstrap.Popover(button, {
        content: popoverContent,
        html: true,
        placement: "top",
        trigger: "manual",
      });

      popover.show();

      // Sự kiện khi nhấn nút "Hủy" để đóng popover
      popoverContent
        .querySelector(".cancel")
        .addEventListener("click", function () {
          popoverContent.remove(); // Xóa popover content khỏi DOM
          popover.dispose(); // Loại bỏ instance của popover
        });

      // Sự kiện khi nhấn nút "Có" để xử lý xóa (nếu cần)
      popoverContent
        .querySelector(".xoa-real")
        .addEventListener("click", function () {
          // Thực hiện hành động xóa (bạn có thể thêm logic xóa ở đây)
          popoverContent.remove(); // Xóa popover content khỏi DOM
          popover.dispose(); // Loại bỏ instance của popover
        });
    });
  });
}

// Khởi tạo các sự kiện khi nhấn nút xóa
attachDeleteListeners();
