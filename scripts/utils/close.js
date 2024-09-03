export function handleOverlayClose() {
  const overlay = document.querySelector(".overlay");

  // Clickable background to enable closing of overlay
  document.querySelector(".overlay").addEventListener("click", () => {
    overlay.style.display = "none";
  });

  // Disable clicking on the overlay content itself
  document.querySelector(".overlay-content").addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close button listener
  document.querySelector(".js-close-button").addEventListener("click", () => {
    overlay.style.display = "none";
  });
  
  // Enable ESC button to close overlay as well
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      overlay.style.display = "none";
    }
  });
}