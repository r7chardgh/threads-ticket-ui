const dragAndSpin = (function () {
  const target = document.querySelector(".ticket-wrapper");
  const targetColor = document.querySelector(".color-bg");
  let timeStart, touchPosStart, touchDegLast, isMoved;
  let deg = +(target.style.transform.match(/\(([^)]+)deg/)?.[1] || 0);
  //touch event
  target.addEventListener("touchstart", (e) => {
    timeStart = e.timeStamp;
    touchPosStart = screen.width / 2 - e.touches[0].clientX;
  });
  target.addEventListener("touchend", (e) => {
    target.classList.add("smooth");
    targetColor.classList.add("smooth");
    let prevDeg = deg;
    if (touchPosStart > 0) {
      //left click
      if (isMoved) {
        //from left to right
        if (touchDegLast > 90) {
          deg += 180;
        }
      } else {
        deg -= 180;
      }
    } else {
      //right click
      if (isMoved) {
        //from right to left
        if (touchDegLast < -90) {
          deg -= 180;
        }
      } else {
        deg += 180;
      }
    }

    target.style.transform = `rotateY(${deg}deg)`;
    //color background position changing
    if (deg % 360 === 0) {
      //go to front side
      if (isMoved) {
        targetColor.style.backgroundPosition = `50% 50%`;
      } else {
        if (touchPosStart < 0) {
          //back right
          console.log(
            "case 1 - back right click",
            targetColor.style.backgroundPosition
          );
          if (targetColor.style.backgroundPosition === "150% 50%") {
            targetColor.style.backgroundPosition = `-50% 50%`;
          }
          targetColor.style.backgroundPosition = `50% 50%`;
        } else {
          console.log(
            "case 2 - back left click",
            targetColor.style.backgroundPosition
          );
          if (targetColor.style.backgroundPosition === "-50% 50%") {
            targetColor.style.backgroundPosition = `150% 50%`;
          }
          targetColor.style.backgroundPosition = `50% 50%`;
        }
      }
    } else {
      //go to  back side
      if (isMoved) {
        targetColor.style.backgroundPosition = `-50% 50%`;
      } else {
        if (touchPosStart < 0) {
          console.log("case 3 - front right click", (deg - prevDeg) % 360);
          targetColor.style.backgroundPosition = `150% 50%`;
        } else {
          console.log("case 4 - front left click", (deg - prevDeg) % 360);
          targetColor.style.backgroundPosition = `-50% 50%`;
        }
      }
    }

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
    if (targetColor.classList.contains("smooth")) {
      targetColor.classList.remove("smooth");
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

    console.log(deg);
    // console.log(((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
    // target.clientWidth) *
    // 100);

    //color background position changing
    if (deg % 360 === 0) {
      targetColor.style.backgroundPosition = `${
        ((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
          target.clientWidth) *
          100 +
        50
      }% 50%`;
    } else {
      if (touchPosStart < 0) {
        targetColor.style.backgroundPosition = `${
          ((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
            target.clientWidth) *
            100 +
          150
        }% 50%`;
      } else {
        targetColor.style.backgroundPosition = `${
          ((touchPosStart - (screen.width / 2 - e.touches[0].clientX)) /
            target.clientWidth) *
            100 -
          50
        }% 50%`;
      }
    }
  });
})();

//+150 or -50
