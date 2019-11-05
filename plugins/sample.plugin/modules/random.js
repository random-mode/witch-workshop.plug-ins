'use strict';

/**
 * Returns a random real number contained within the given half-open interval [`min`, `max`[.
 * @param {Number} `min` the interval's minimum (included)
 * @param {Number} `max` the interval's maximum (excluded)
 */
const random__range = min => max => {
  return Math.random() * (max - min) + min;
};

// Immediately Invoked Function Expression (IIFE) for illustration purposes
(function() {
  console.log(
    `[#${Project.filename()}] random__range(10)(20) => ${random__range(10)(20)}`
  );
})();
