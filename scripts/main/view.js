export function handleViewButtons() {
    document.querySelectorAll(".js-character-view-button").forEach((button) => {
        button.addEventListener("click", () => {
            const characterToView = button.dataset.characterId;
            window.location.href = `character.html?id=${characterToView}`;
        });
    });
}