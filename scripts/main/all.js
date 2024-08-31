export function handleViewAll() {
  document.querySelector(".view-all-button").addEventListener("click", () => {
    window.location.href = "/index.html?search=all"
  });
}