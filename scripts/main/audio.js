const audioButton = document.querySelector(".audio-button");
const genshinOst = document.querySelector(".genshin-ost");
const allOst = document.querySelectorAll("audio");

function stopAllAudios() {
  allOst.forEach(audio => {
    if (!audio.paused) {
      audio.pause();
    }
  });
};

export function handleMusic() {
  if (genshinOst.paused) {
    stopAllAudios();
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

export function handleNationAudio() {
  const nationContainers = document.querySelectorAll(".nation-container");
  
  nationContainers.forEach((nation, index) => {
    // Play specific nation's audio on hover
    nation.addEventListener("mouseenter", () => {
      stopAllAudios();
      audioButton.innerHTML = `
        <img class="play-icon" src="./assets/icons/play-icon.png" alt="Play Icon">
      `;

      // Plus 1 because the first audio is the main audio
      if (allOst[index + 1]) {
        allOst[index + 1].play();
        allOst[index + 1].volume = 0.3;
      }
    });

    // And pause nation's audio upon hover exit
    nation.addEventListener("mouseleave", () => {
      allOst[index + 1].pause();
    });
  });
}
