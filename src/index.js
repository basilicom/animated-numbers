var babel = require("@babel/core");

export default () => {
  window.app = window.app ? window.app : {};
  let app = window.app;

  // custom events
  app.events = {};

  app.events.inviewport = new CustomEvent('inviewport');

  app.openanimations = true;
  app.openanigraphs = true;
  app.aninums = {};

  app.elementInViewport = function(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    if ((top >= window.pageYOffset) && (left >= window.pageXOffset) && ((top + height) <= (window.pageYOffset + window.innerHeight)) && ((left + width) <= (window.pageXOffset + window.innerWidth))) {
      console.log('element', el, 'is in viewport!');
    }

    return (top >= window.pageYOffset) && (left >= window.pageXOffset) && ((top + height) <= (window.pageYOffset + window.innerHeight)) && ((left + width) <= (window.pageXOffset + window.innerWidth));
  };

  app.AnimatedNumbersBuilder = function() {
    // Animated Numbers
    let animateNumber = id => {
      const numelem = document.getElementById(id).querySelector('.animated-number_number_nr');
      app.aninums[id].interval = window.setInterval(function() {
          if (app.aninums[id].actnum < app.aninums[id].maxnum) {
            app.aninums[id].actnum = app.aninums[id].actnum + app.aninums[id].step;
            numelem.innerHTML = (app.aninums[id].actnum * app.aninums[id].negnum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          } else {
            numelem.innerHTML = (app.aninums[id].maxnum * app.aninums[id].negnum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            window.clearInterval(app.aninums[id].interval);
          }
        }
        , app.aninums[id].delay);
    };

    let arr = document.querySelectorAll('.animated-number');
    arr.forEach((aninum, index) => {
      const numelem = aninum.querySelector('.animated-number_number_nr');
      const regex = /[.,\s]/g;
      let maxnum = numelem.innerHTML.replace(regex, '');
      maxnum = parseInt(maxnum,10);
      let negnum = 1;
      if (maxnum !== 0) {
        let delay, step;
        if (maxnum < 0) {
          maxnum = maxnum * (-1);
          negnum = -1;
        }
        if ((aninum.id === "") || undefined) {
          aninum.id = "aninum_"+index;
        }
        if ((1000/maxnum) < 20) {
          delay = 20;
          step = parseInt(20/(1000/maxnum),10);
        } else {
          delay = 1000/maxnum;
          step = 1;
        }

        app.aninums[aninum.id] = {
          'interval':null,
          'delay': delay,
          'step':step,
          'actnum':0,
          'maxnum':maxnum,
          'negnum': negnum
        };

        numelem.innerHTML = "0";
        aninum.addEventListener('inviewport', function() {
          animateNumber(this.id);
        });
      }
    });
  };

  // Window Scroll
  app.WindowScrollBinder = function() {
    const aniNumsInDoc = document.querySelectorAll('.animated-number').length > 0;
    window.aniNumsInDoc = aniNumsInDoc;

    window.onscroll = function(e) {

      if (aniNumsInDoc) {
        app.openanimations = false;
        let arr = document.querySelectorAll('.animated-number');

        arr.forEach(aninum => {
          if (app.aninums[aninum.id].interval === null) {
            app.openanimations = true;
            if (app.elementInViewport(aninum)) {
              aninum.dispatchEvent(app.events.inviewport);
            }
          }
        });
      }
    };
  };
  document.addEventListener('DOMContentLoaded', () => {
    app.WindowScrollBinder();
    app.AnimatedNumbersBuilder();
  });
}
