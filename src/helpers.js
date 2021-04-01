/**
 *
 * @param str - string to manipulate
 * @param sub - char or string to insert into str
 * @param dec - decimal precision count, e.g. 2 for 0,12
 * @returns {string}
 */

export const insertAt = (str, sub, dec) => {

  let string = str.toString();

  // if a decimal separator is present
  //  and the position of the comma suceeds dots
  // if so, add a dot every three digits
  if (dec > 3) {
    string = string.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // add a comma only if it is present in the original number
  if (dec > 0 && dec < str.length-1) {
    // if string is empty, append a 0
    let preCommaString = string.slice(0, string.length-dec);
    if (preCommaString === '') {
      preCommaString = 0;
    }

    return `${preCommaString}${sub}${string.slice(string.length-dec)}`;
  }
  return `${string.slice(0, dec)}${string.slice(dec)}`;
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
