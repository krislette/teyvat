export function handleOverlayClose() {
  // Clickable background to enable closing of overlay
  document.querySelector(".overlay").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });

  // Disable clicking on the overlay content itself
  document.querySelector(".overlay-content").addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Close button listener
  document.querySelector(".js-close-button").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });
}