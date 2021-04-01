import { elementIsInViewport } from "./helpers";
import { animatedNumbersBuilder } from "./animatedNumbersBuilder";

document.addEventListener("DOMContentLoaded", () => {
  window.app = window.app ? window.app : {};
  let app = window.app;

  app.events = app.events ? app.events : {};
  app.events.inviewport = new CustomEvent("inviewport");
  app.openanimations = true;
  app.aninums = {};

  app.elementIsInViewport = elementIsInViewport;
  app.animatedNumbersBuilder = animatedNumbersBuilder;

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
    app.animatedNumbersBuilder();
  };
  app.WindowScrollBinder();
});
