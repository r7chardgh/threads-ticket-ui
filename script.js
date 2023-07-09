const dragAndSpin = (function () {
  const target = document.querySelector(".ticket-wrapper");
  let timeStart, touchPosStart, touchDegLast, isMoved;
  let deg = +(target.style.transform.match(/\(([^)]+)deg/)?.[1] || 0);
  //touch event
  target.addEventListener("touchstart", (e) => {
    timeStart = e.timeStamp;
    touchPosStart = screen.width / 2 - e.touches[0].clientX;
  });
  target.addEventListener("touchend", (e) => {
    target.classList.add("smooth");
    if (touchPosStart > 0) {
      if (isMoved) {
        if (touchDegLast > 90) {
          deg += 180;
        }
      } else {
        deg -= 180;
      }
    } else {
      if (isMoved) {
        if (touchDegLast < -90) {
          deg -= 180;
        }
      } else {
        deg += 180;
      }
    }
    target.style.transform = `rotateY(${deg}deg)`;
    isMoved = false;
  });

  //drag event
  target.addEventListener("touchmove", (e) => {
    if (!isMoved) {
      isMoved = true;
    }
    if (target.classList.contains("smooth")) {
      target.classList.remove("smooth");
    }

    target.style.transform = `rotateY(${
      deg +
      ((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
        target.clientWidth) *
        180
    }deg)`;
    touchDegLast =
      ((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
        target.clientWidth) *
      180;
  });
})();
