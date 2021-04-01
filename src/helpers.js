export const insertAt = (str, sub, pos) => {
  let string = str.toString();

  // add a dot every three digitls
  string = string.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${string.slice(0, pos)}${sub}${string.slice(pos)}`;
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
