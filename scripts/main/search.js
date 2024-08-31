export function handleSearch() {
  document.querySelector(".js-search-button").addEventListener("click", () => {
    setUrlHref();
  });

  document.querySelector(".js-search-bar").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      setUrlHref();
    }
  });

  const params = new URLSearchParams(window.location.search);
  const search = params.get("search");

  if (search) {
    document.querySelector(".js-search-bar").value = search === "none" ? "" : search;
  }
}

function setUrlHref() {
  const search = document.querySelector(".js-search-bar").value;
  window.location.href = search === "" ? "/index.html?search=none" : `/index.html?search=${search.toLowerCase()}`;
}
