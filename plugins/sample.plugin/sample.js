'use strict';

/*:
 * @plugindesc
 * Sample plug-in
 *
 * @author acs-l
 *
 * @help
 * This plug-in serves as a basic illustration of the integration's process.
 */

/* ============================================================================
 * # Adding additional behaviour to standard objects.
 * ========================================================================= */
/**
 * Splits `this` string using the default line feed symbol (`\n`)
 * in order to extract its lines as cells of an ordered array.
 * @return {Array<String>} A new ordered array containing each line.
 */
String.prototype.lines = function() {
  return this.split('\n');
};

// Immediately Invoked Function Expression (IIFE) for illustration purposes
(function() {
  console.log(`[#${Project.filename()}] I am a sample script`);
})();
