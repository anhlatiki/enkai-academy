/**
 * Enkai Academy — Main Script
 * Handles gallery rendering, filtering, modal detail view
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- NAV SCROLL ----------
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  // ---------- MOBILE MENU ----------
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  // ---------- LOAD WORKS ----------
  let works = [];

  async function loadWorks() {
    try {
      const res = await fetch("data/works.json");
      if (!res.ok) throw new Error("Không tải được danh sách tác phẩm");
      works = await res.json();
      renderGallery(works);
    } catch (err) {
      console.error(err);
      // Fallback sample nếu không có file JSON (khi mở local file://)
      works = getFallbackWorks();
      renderGallery(works);
    }
  }

  function getFallbackWorks() {
    return [
      {
        id: 1,
        title: "Hoàng hôn trên biển",
        type: "image",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        description: "Khoảnh khắc hoàng hôn vàng óng trên mặt biển.",
        date: "2025-06-12",
      },
      {
        id: 2,
        title: "Con đường lá vàng",
        type: "image",
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        description: "Mùa thu về, lá vàng rơi đầy trên con đường.",
        date: "2025-10-03",
      },
      {
        id: 3,
        title: "Thành phố về đêm",
        type: "image",
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
        description: "Ánh đèn thành phố lung linh trong đêm.",
        date: "2025-12-20",
      },
      {
        id: 4,
        title: "Video mẫu",
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Video demo. Thay bằng video thật của bạn.",
        date: "2026-01-15",
      },
    ];
  }

  // ---------- RENDER GALLERY ----------
  const grid = document.getElementById("galleryGrid");

  function renderGallery(list) {
    grid.innerHTML = "";

    if (!list.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <p style="font-size:1.2rem">Chưa có tác phẩm nào</p>
          <p>Hãy thêm ảnh/video vào thư mục assets và cập nhật file data/works.json</p>
        </div>`;
      return;
    }

    list.forEach((item) => {
      const card = document.createElement("article");
      card.className = "gallery-item";
      card.dataset.type = item.type;
      card.dataset.id = item.id;

      const media =
        item.type === "video"
          ? `<video src="${item.src}" muted loop playsinline preload="metadata"></video>
             <span class="item-badge">VIDEO</span>`
          : `<img src="${item.src}" alt="${item.title}" loading="lazy" />`;

      card.innerHTML = `
        ${media}
        <div class="item-overlay">
          <h3 class="item-title">${item.title}</h3>
          <span class="item-type">${item.type === "video" ? "Video" : "Ảnh"}</span>
        </div>
      `;

      card.addEventListener("click", () => openModal(item));
      grid.appendChild(card);
    });
  }

  // ---------- FILTER ----------
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const filtered =
        filter === "all" ? works : works.filter((w) => w.type === filter);
      renderGallery(filtered);
    });
  });

  // ---------- MODAL ----------
  const modal = document.getElementById("detailModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTitle = document.getElementById("modalTitle");
  const modalType = document.getElementById("modalType");
  const modalDesc = document.getElementById("modalDesc");
  const modalDate = document.getElementById("modalDate");

  function openModal(item) {
    modalTitle.textContent = item.title;
    modalType.textContent = item.type === "video" ? "Video" : "Ảnh";
    modalDesc.textContent = item.description || "";
    modalDate.textContent = item.date
      ? `Ngày: ${formatDate(item.date)}`
      : "";

    modalMedia.innerHTML = "";
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      modalMedia.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.title;
      modalMedia.appendChild(img);
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Stop video if playing
    const v = modalMedia.querySelector("video");
    if (v) {
      v.pause();
      v.src = "";
    }
  }

  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document.querySelector(".modal-overlay").addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Start
  loadWorks();
});
