'use strict';

/*:
 * @plugindesc
 * Loads project's specific plugins.
 *
 * @author acs-l
 *
 * @param Plugins' directory
 * @desc Path to the directory where plugins'-being-developed are stored
 * Default value: witch-workshop.plug-ins/plugins
 * @default witch-workshop.plug-ins/plugins
 */

const Project = {};

/**
 * Returns the filename of the current script (i.e.: the one which is invoking this function).
 * @return {String} the current script's filename.
 */
Project.filename = () => {
  const scripts = document.getElementsByTagName('script');
  const path = scripts[scripts.length - 1].src;
  const filename = path.substring(
    path.lastIndexOf('/') + 1,
    path.lastIndexOf('.')
  );
  return filename;
};

/**
 * Short-hand to constructs a new plugin representation (as used in `plugins.list.js`).
 * @param {String} `name` the plugin's short name
 * @param {String} `source` the plugin's main script's location
 * @eturn the structure which holds one plugin's information.
 */
Project.Plugin = (name, source) => {
  return {
    name: name,
    source: source,
  };
};
