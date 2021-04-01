import { notFoundError, insertAt} from "./helpers";

export const animatedNumbersBuilder = () => {

  const animationProps = function animationProps(aninum) {
    let numelem = aninum.querySelector(".animated-number_number_nr");
    let regex, maxnum, negnum, delay, step;

    if (numelem) {

      // zero-basing
      const totalNumLength = numelem.innerHTML.length -1;
      // save position of comma, if there is one
      const commaPos = numelem.innerHTML.indexOf(',') > 0 ? numelem.innerHTML.indexOf(',') : 0;
      const decimalPrecision = totalNumLength - commaPos;

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
          step = parseInt(10 / (1000 / maxnum), 10);
        } else {
          delay = 1000 / maxnum;
          step = 1;
        }

        return {
          step: step,
          delay: delay,
          maxnum: maxnum,
          negnum: negnum,
          decimalPrecision: decimalPrecision
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

        // while number is animating
        if (app.aninums[id].actnum < app.aninums[id].maxnum) {
          app.aninums[id].actnum = app.aninums[id].actnum + app.aninums[id].step;
          numelem.innerHTML = (app.aninums[id].actnum * app.aninums[id].negnum);
          numelem.innerHTML = insertAt(numelem.innerHTML, ',', app.aninums[id].decimalPrecision);
        }
        // when done animating the number
        else {
          numelem.innerHTML = (app.aninums[id].maxnum * app.aninums[id].negnum);
          numelem.innerHTML = insertAt(numelem.innerHTML, ',', app.aninums[id].decimalPrecision);

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
        decimalPrecision: animationProps(aninum).decimalPrecision,
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
