export function handleAnchorSearch() {
  const searchBar = document.querySelector(".js-search-bar");

  document.querySelector("#js-scroll-anchor").addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchBar.focus();

    searchBar.classList.add("pulse-animation");

    setTimeout(() => {
      searchBar.classList.remove("pulse-animation");
    }, 3000);
  });
}