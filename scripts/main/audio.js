const audioButton = document.querySelector(".audio-button");
const genshinOst = document.querySelector(".genshin-ost");

function handleMusic() {
  if (genshinOst.paused) {
    genshinOst.play();
    audioButton.innerHTML = `
      <img class="play-icon" src="./assets/icons/pause-icon.png" alt="Pause Icon">
    `;
  } else {
    genshinOst.pause();
    audioButton.innerHTML = `
      <img class="play-icon" src="./assets/icons/play-icon.png" alt="Play Icon">
    `;
  }
}

audioButton.addEventListener("click", () => {
  handleMusic();
  genshinOst.volume = 1.0;
});
