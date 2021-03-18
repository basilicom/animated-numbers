document.addEventListener("DOMContentLoaded", () => {
  window.app = window.app ? window.app : {};
  let app = window.app;
  let notFoundError = 'Error: could not find item to animate!';

  app.events = app.events ? app.events : {};
  app.events.inviewport = new CustomEvent("inviewport");
  app.openanimations = true;
  app.aninums = {};

  app.elementIsInViewport = function (el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

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


    const animationProps = function animationProps(aninum) {
      let numelem = aninum.querySelector(".animated-number_number_nr");
      let regex, maxnum, negnum, delay, step;

      if (numelem) {

        // save position of comma, if there is one
        let posOfComma = numelem.innerHTML.indexOf(',');

        regex = /[.,\s]/g;
        maxnum = numelem.innerHTML.replace(regex, "");

        maxnum = parseInt(maxnum, 10);
        negnum = 1;
        delay = 20;
        step = 1;

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

          return {
            step: step,
            delay: delay,
            maxnum: maxnum,
            negnum: negnum,
          };
        }
      } else {
        console.error(notFoundError);
      }
    };

    // animation logic
    const animateNumber = function animateNumber(id) {
      let numelem = document
        .getElementById(id)
        .querySelector(".animated-number_number_nr");

      if (numelem) {
        app.aninums[id].interval = window.setInterval(function () {
          // ascending numbers, e.g. if number is positive
          if (app.aninums[id].actnum < app.aninums[id].maxnum) {
            app.aninums[id].actnum = app.aninums[id].actnum + app.aninums[id].step;
            numelem.innerHTML = (app.aninums[id].actnum * app.aninums[id].negnum)
              .toString()
              // add a dot every three digitls
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
              //TODO account for decimal precision
          }
          // descending numbers, e.g. if number is negative
          else {
            numelem.innerHTML = (app.aninums[id].maxnum * app.aninums[id].negnum)
              .toString()
              // add a dot every three digitls
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            window.clearInterval(app.aninums[id].interval);
            app.aninums[id].isInViewport = true;
          }
        }, app.aninums[id].delay);
      } else {
        console.error(notFoundError);
      }
    };

    // DOM logic
    const arr = document.querySelectorAll(".animated-number");
    arr.forEach(function (aninum, index) {

      // assign an id to aninum if it has none
      let numelem = aninum.querySelector(".animated-number_number_nr");

      if (numelem) {
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
        if (app.elementIsInViewport(aninum)) {
          animateNumber(aninum.id);
        }

        // custom event definition
        aninum.addEventListener("inviewport", function () {
          animateNumber(aninum.id);
        });
      }
      else {
        console.error(notFoundError);
      }
    });
  };

  app.WindowScrollBinder = function () {
    let aniNumsInDoc = document.querySelectorAll(".animated-number").length > 0;
    window.aniNumsInDoc = aniNumsInDoc;

    window.onscroll = function (e) {
      if (aniNumsInDoc) {
        app.openanimations = false;
        let arr = document.querySelectorAll(".animated-number");
        arr.forEach(function (aninum) {
          if (app.aninums[aninum.id].interval === null) {
            app.openanimations = true;

            if (app.elementIsInViewport(aninum)) {
              // dispatch the given aninum's custom event
              aninum.dispatchEvent(app.events.inviewport);
            }
          }
        });
      }
    };
    app.AnimatedNumbersBuilder();
  };
  app.WindowScrollBinder();
});
