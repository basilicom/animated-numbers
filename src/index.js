"use strict";

window.app = window.app ? window.app : {};
let app = window.app; // custom events

app.events = {};
app.events.inviewport = new CustomEvent("inviewport");
app.openanimations = true;
app.openanigraphs = true;
app.aninums = {};

// establish whether the element is within the current viewport
app.elementInViewport = function (el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  if (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  ) {
    return true;
  }
};

app.AnimatedNumbersBuilder = function () {
  // animation logic
  let animateNumber = id => {
    const numelem = document
      .getElementById(id)
      .querySelector(".animated-number_number_nr");
    app.aninums[id].interval = window.setInterval(function () {
      if (app.aninums[id].actnum < app.aninums[id].maxnum) {
        app.aninums[id].actnum = app.aninums[id].actnum + app.aninums[id].step;
        numelem.innerHTML = (app.aninums[id].actnum * app.aninums[id].negnum)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } else {
        numelem.innerHTML = (app.aninums[id].maxnum * app.aninums[id].negnum)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        window.clearInterval(app.aninums[id].interval);
        app.aninums[id].isInViewport = true;
      }
    }, app.aninums[id].delay);
  };

  // animation delay
  let animationProps = aninum => {
    const numelem = aninum.querySelector(".animated-number_number_nr");
    const regex = /[.,\s]/g;
    let maxnum = numelem.innerHTML.replace(regex, "");
    maxnum = parseInt(maxnum, 10);
    let negnum = 1;
    let delay = 20;
    let step = 1;

    if (maxnum !== 0) {

      if (maxnum < 0) {
        maxnum = maxnum * -1;
        negnum = -1;
      }

      if (1000 / maxnum < 20) {
        delay = 20;
        step = parseInt(20 / (1000 / maxnum), 10);
      } else {
        delay = 1000 / maxnum;
        step = 1;
      }

      return {step, delay, maxnum, negnum};
    }
  }

  let arr = document.querySelectorAll(".animated-number");
  arr.forEach((aninum, index) => {
    const numelem = aninum.querySelector(".animated-number_number_nr");

    // assign an id to aninum if it has none
    if (aninum.id === "" || undefined) {
      aninum.id = "aninum_" + index;
    }

    // populate aninum with animation properties
    app.aninums[aninum.id] = {
      interval: null,
      delay: animationProps(aninum).delay,
      step: animationProps(aninum).step,
      actnum: 0,
      maxnum: animationProps(aninum).maxnum,
      negnum: animationProps(aninum).negnum,
      isInViewport: false
    };

    // set animated number to 0 and count up
    numelem.innerHTML = "0";

    // perform animation if the aninum is within
    // the viewport on initial page load
    if (app.elementInViewport(aninum)) {
      animateNumber(aninum.id);
    }

    // custom event definition
    // if the aninum appears within the viewport
    aninum.addEventListener("inviewport", function () {
      animateNumber(aninum.id);
    });
  });
};

app.WindowScrollBinder = function () {
  const aniNumsInDoc = document.querySelectorAll(".animated-number").length > 0;
  window.aniNumsInDoc = aniNumsInDoc;

  window.onscroll = function (e) {
    if (aniNumsInDoc) {
      app.openanimations = false;
      let arr = document.querySelectorAll(".animated-number");
      arr.forEach((aninum) => {
        if (app.aninums[aninum.id].interval === null) {
          app.openanimations = true;

          if (app.elementInViewport(aninum)) {
          // dispatch the given aninum's custom event
            aninum.dispatchEvent(app.events.inviewport);
          }
        }
      });
    }
  };
};
