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

    const completionPercentage = ((currentPageIndex + 1) / pageCount) * 100;
    completionBar.style.width = `${completionPercentage}%`;

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
  leftButton.addEventListener("click", () => {
    console.log("Left button clicked");
    goToPage(currentPageIndex - 1);
  });

  rightButton.addEventListener("click", () => {
    console.log("Right button clicked");
    goToPage(currentPageIndex + 1);
  });

  console.log("DOM fully loaded. Initializing display.");
  // Initialize display on load
  updatePageDisplay();
});
