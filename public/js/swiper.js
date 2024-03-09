const track = document.querySelector(".project_wrapper");
// const images = track.querySelectorAll(".project_wrapper__container").querySelectorAll(".img-wrapper");

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
  console.log(track.dataset.mouseDownAt)
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;

  nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, -100), 0);
  track.dataset.percentage = nextPercentage;
  
  track.style.transform = `translate(${nextPercentage}%, -30%)`;
  
  // images.style.backgroundColor = `aliceblue`;
  
  for(const container of track.querySelectorAll(".project_wrapper__container")){
    for(const image of container.querySelectorAll(".img-wrapper")){
      image.style.objectPosition = `${nextPercentage + 100 }%, 50%`;
      // console.log(`${nextPercentage + 100 }%, 50%`);
      // image.style.backgroundColor = `red`;
    }
  }
  track.animate({
    transform: `translate(${nextPercentage}%, -30%)`
  }, { duration: 1200, fill: "forwards"});

  
}

window.onmouseup = e => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}