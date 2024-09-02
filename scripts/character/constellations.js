import { displayOverlay } from "../utils/overlay.js";

export function handleConsButtons() {
  document.querySelectorAll(".js-cons-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { consLvl } = button.dataset;
      displayOverlay(consLvl, "constellation");
    });
  });

  document.querySelector(".js-close-button").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });
}