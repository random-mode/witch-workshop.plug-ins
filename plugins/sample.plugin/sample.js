/*:
 * @plugindesc
 * Sample plug-in
 *
 * @help
 * This plug-in simply acts as a sample.
 */

 /* ============================================================================
 * # Adding additional behaviour to standard objects.
 * ========================================================================= */
/**
 * Splits `this` string using the default line feed symbol (`\n`)
 * in order to extract its lines as cells of an ordered array.
 * @return {Array<String>} A new ordered array containing each line.
 */
String.prototype.lines = function(){
	return this.split("\n");
}