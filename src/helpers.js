/**
 *
 * @param str - string to manipulate
 * @param sub - char or string to insert into str
 * @param dec - decimal precision count, e.g. 2 for 0,12
 * @returns {string}
 */

export const insertAt = (str, sub, dec) => {

  let string = str.toString();

  // add a comma only if it is present in the original number
  if (dec > 0) {
    // if string is empty, append a 0
    let preCommaString = string.slice(0, string.length-dec);
    if (preCommaString === '') {
      preCommaString = 0;
    }
    return `${preCommaString}${sub}${string.slice(string.length-dec)}`;
  }
  // if no comma is present in the original number
  else {
    string = `${string.slice(0, dec)}${string.slice(dec)}`;
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

export const elementIsInViewport = (el) => {
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

export const notFoundError = 'Error: could not find item to animate!';
