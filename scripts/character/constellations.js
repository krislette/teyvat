import { displayOverlay } from "../utils/overlay.js";
import { handleOverlayClose } from "../utils/close.js";

export function handleConsButtons() {
  document.querySelectorAll(".js-cons-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { consLvl } = button.dataset;
      displayOverlay(consLvl, "constellation");
    });
  });

  handleOverlayClose();
}