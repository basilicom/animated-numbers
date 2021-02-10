(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["animated-numbers"] = factory();
	else
		root["animated-numbers"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    // TODO: move outside of module\n    app.WindowScrollBinder();\n    app.AnimatedNumbersBuilder();\n  });\n  window.app = window.app ? window.app : {};\n  var app = window.app; // custom events\n\n  app.events = {};\n  app.events.inviewport = new CustomEvent(\"inviewport\");\n  app.openanimations = true;\n  app.openanigraphs = true;\n  app.aninums = {}; // establish whether the element is within the current viewport\n\n  app.elementInViewport = function (el) {\n    var top = el.offsetTop;\n    var left = el.offsetLeft;\n    var width = el.offsetWidth;\n    var height = el.offsetHeight;\n\n    while (el.offsetParent) {\n      el = el.offsetParent;\n      top += el.offsetTop;\n      left += el.offsetLeft;\n    }\n\n    if (top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth) {\n      return true;\n    }\n  };\n\n  app.AnimatedNumbersBuilder = function () {\n    // animation logic\n    var animateNumber = function animateNumber(id) {\n      var numelem = document.getElementById(id).querySelector(\".animated-number_number_nr\");\n      app.aninums[id].interval = window.setInterval(function () {\n        if (app.aninums[id].actnum < app.aninums[id].maxnum) {\n          app.aninums[id].actnum = app.aninums[id].actnum + app.aninums[id].step;\n          numelem.innerHTML = (app.aninums[id].actnum * app.aninums[id].negnum).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \".\");\n        } else {\n          numelem.innerHTML = (app.aninums[id].maxnum * app.aninums[id].negnum).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \".\");\n          window.clearInterval(app.aninums[id].interval);\n          app.aninums[id].isInViewport = true;\n        }\n      }, app.aninums[id].delay);\n    }; // animation delay\n\n\n    var animationProps = function animationProps(aninum) {\n      var numelem = aninum.querySelector(\".animated-number_number_nr\");\n      var regex = /[.,\\s]/g;\n      var maxnum = numelem.innerHTML.replace(regex, \"\");\n      maxnum = parseInt(maxnum, 10);\n      var negnum = 1;\n      var delay = 20;\n      var step = 1;\n\n      if (maxnum !== 0) {\n        if (maxnum < 0) {\n          maxnum = maxnum * -1;\n          negnum = -1;\n        }\n\n        if (1000 / maxnum < 20) {\n          delay = 20;\n          step = parseInt(20 / (1000 / maxnum), 10);\n        } else {\n          delay = 1000 / maxnum;\n          step = 1;\n        }\n\n        return {\n          step: step,\n          delay: delay,\n          maxnum: maxnum,\n          negnum: negnum\n        };\n      }\n    };\n\n    var arr = document.querySelectorAll(\".animated-number\");\n    arr.forEach(function (aninum, index) {\n      var numelem = aninum.querySelector(\".animated-number_number_nr\"); // assign an id to aninum if it has none\n\n      if (aninum.id === \"\" || undefined) {\n        aninum.id = \"aninum_\" + index;\n      } // populate aninum with animation properties\n\n\n      app.aninums[aninum.id] = {\n        interval: null,\n        delay: animationProps(aninum).delay,\n        step: animationProps(aninum).step,\n        actnum: 0,\n        maxnum: animationProps(aninum).maxnum,\n        negnum: animationProps(aninum).negnum,\n        isInViewport: false\n      }; // set animated number to 0 and count up\n\n      numelem.innerHTML = \"0\"; // perform animation if the aninum is within\n      // the viewport on initial page load\n\n      if (app.elementInViewport(aninum)) {\n        animateNumber(aninum.id);\n      } // custom event definition\n      // if the aninum appears within the viewport\n\n\n      aninum.addEventListener(\"inviewport\", function () {\n        animateNumber(aninum.id);\n      });\n    });\n  };\n\n  app.WindowScrollBinder = function () {\n    var aniNumsInDoc = document.querySelectorAll(\".animated-number\").length > 0;\n    window.aniNumsInDoc = aniNumsInDoc;\n\n    window.onscroll = function (e) {\n      if (aniNumsInDoc) {\n        app.openanimations = false;\n        var arr = document.querySelectorAll(\".animated-number\");\n        arr.forEach(function (aninum) {\n          if (app.aninums[aninum.id].interval === null) {\n            app.openanimations = true;\n\n            if (app.elementInViewport(aninum)) {\n              // dispatch the given aninum's custom event\n              aninum.dispatchEvent(app.events.inviewport);\n            }\n          }\n        });\n      }\n    };\n  };\n});\n\n//# sourceURL=webpack://animated-numbers/./src/index.js?");

/***/ })

/******/ });
});