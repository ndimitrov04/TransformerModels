// script.js

document.addEventListener("DOMContentLoaded", () => {
  const contentWrapper = document.querySelector(".content-wrapper");
  const pages = document.querySelectorAll(".page");
  const menuItems = document.querySelectorAll(".horizontal-menu li");
  const completionBar = document.querySelector(".completion-bar");
  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  const hamburger = document.getElementById("hamburger-menu");
  const navMenu = document.querySelector(".horizontal-menu");
  const mobilePageTitle = document.getElementById("mobile-current-page-title");

  let currentPageIndex = 0;
  const pageCount = pages.length;

  const updatePageDisplay = () => {
    if (!contentWrapper) return;

    console.log(`Updating display for page index: ${currentPageIndex}`);
    const offset = -currentPageIndex * 100;
    contentWrapper.style.transform = `translateX(${offset}vw)`;

    menuItems.forEach((item, index) => {
      if (index === currentPageIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (completionBar && pageCount > 0) {
      const completionPercentage = ((currentPageIndex + 1) / pageCount) * 100;
      completionBar.style.width = `${completionPercentage}%`;
    }

    // Update mobile page title
    const activeMenuItem = menuItems[currentPageIndex];
    if (mobilePageTitle && activeMenuItem) {
      mobilePageTitle.textContent =
        activeMenuItem.querySelector("a").textContent;
    }
  };

  const goToPage = (index) => {
    console.log(`Attempting to go to page index: ${index}`);
    if (index >= 0 && index < pageCount) {
      currentPageIndex = index;
      updatePageDisplay();
    }
  };

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Event listeners for menu items
  menuItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      console.log(`Menu item clicked: ${index}`);
      e.preventDefault();
      goToPage(index);
      // Close mobile menu after selection
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
    });
  });

  // Event listeners for global navigation buttons
  if (leftButton) {
    leftButton.addEventListener("click", () => {
      console.log("Left button clicked");
      goToPage(currentPageIndex - 1);
    });
  }

  if (rightButton) {
    rightButton.addEventListener("click", () => {
      console.log("Right button clicked");
      goToPage(currentPageIndex + 1);
    });
  }

  // Image Zoom Lightbox Logic
  const initImageZoom = () => {
    const overlay = document.createElement("div");
    overlay.className = "image-zoom-overlay";
    const zoomedImg = document.createElement("img");
    zoomedImg.className = "no-zoom";
    overlay.appendChild(zoomedImg);
    document.body.appendChild(overlay);

    const closeZoom = () => {
      overlay.classList.remove("active");
      setTimeout(() => {
        zoomedImg.src = "";
      }, 300);
    };

    overlay.addEventListener("click", closeZoom);

    // Use event delegation for better performance and handling dynamic content
    document.addEventListener("click", (e) => {
      const img = e.target.closest("img:not(.no-zoom)");
      if (img && !overlay.contains(img)) {
        e.preventDefault();
        zoomedImg.src = img.src;
        overlay.classList.add("active");
      }
    });
  };

  initImageZoom();

  console.log("DOM fully loaded. Initializing display.");
  // Initialize display on load
  updatePageDisplay();
});
