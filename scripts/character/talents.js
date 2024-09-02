import { displayOverlay } from "../utils/overlay.js";

export function handleTalentButtons() {
  document.querySelectorAll(".js-talent-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { talent } = button.dataset;
      displayOverlay(talent, "talent");
    });
  });

  document.querySelector(".js-close-button").addEventListener("click", () => {
    document.querySelector(".overlay").style.display = "none";
  });
}