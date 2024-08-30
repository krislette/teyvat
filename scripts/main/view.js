export function handleViewButtons() {
  document.querySelectorAll(".js-character-view-button").forEach((button) => {
    button.addEventListener("click", () => {
      const { characterId } = button.dataset;
      window.location.href = `character.html?id=${characterId}`;
    });
  });
}
