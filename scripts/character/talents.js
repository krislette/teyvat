import { displayOverlay } from "../utils/overlay.js";
import { handleOverlayClose } from "../utils/close.js";

export function handleTalentButtons() {
  document.querySelectorAll(".js-talent-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { talent } = button.dataset;
      displayOverlay(talent, "talent");
    });
  });

  handleOverlayClose();
}