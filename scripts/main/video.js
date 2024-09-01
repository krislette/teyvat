const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
};

const observer = new IntersectionObserver(handleVideoOnScroll, options);
const videoSection = document.querySelector(".video-section");
const video = document.querySelector("#genshin-video");
const muteButton = document.querySelector(".mute-button");

observer.observe(video);
video.volume = 0.2;

export function handleVideoOnScroll(entries) {
  entries.forEach((entry) => {
    if (entry.target.id === "genshin-video" && entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}

video.addEventListener("click", () => {
  const overlayIcon = document.createElement("img");
  overlayIcon.classList.add("overlay-icon");

  if (video.paused) {
    video.play();
    overlayIcon.src = "./assets/icons/play-icon.png"
  } else {
    video.pause();
    overlayIcon.src = "./assets/icons/pause-icon.png"
  }

  videoSection.appendChild(overlayIcon);

  setTimeout(() => {
    overlayIcon.remove();
  }, 1000);
});

muteButton.addEventListener("click", () => {
  const muteIcon = document.querySelector(".mute-icon");

  if (video.muted) {
    video.muted = false;
    muteIcon.src = "./assets/icons/unmute-icon.png";
  } else {
    video.muted = true;
    muteIcon.src = "./assets/icons/mute-icon.png";
  }
});
