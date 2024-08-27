export function toggleButtons() {
    const mainPageButton = document.querySelector(".main-page-button");
    const constellationsButton = document.querySelector(".constellations-button");

    mainPageButton.addEventListener("click", () => {
        mainPageButton.classList.add("active");
        constellationsButton.classList.remove("active");
    });

    constellationsButton.addEventListener("click", () => {
        constellationsButton.classList.add("active");
        mainPageButton.classList.remove("active");
    });
}