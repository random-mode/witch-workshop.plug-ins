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
 * Logging utilitary
 */
Project.log = (() => {
  const format_digits = nb_min_digits => x =>
    x.toLocaleString('en-US', {
      minimumIntegerDigits: nb_min_digits,
      useGrouping: false,
    });

  const get_time = () => {
    const d = new Date();
    const hours = format_digits(2)(d.getHours());
    const minutes = format_digits(2)(d.getMinutes());
    const seconds = format_digits(2)(d.getSeconds());
    const milliseconds = format_digits(3)(d.getMilliseconds());

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  const rmex_formatter = message => {
    return [
      `%c[${get_time()}] %cRMEx %c ${message}`,
      'background: #113F59; color: #F3EDD3; padding:4px 0px 4px 4px; border-radius: 5px 0px 0px 5px;',
      'background: #113F59; color: #19BEC0; font-weight: bold; padding: 4px 2px 4px; border-radius: 0px 5px 5px 0px;',
      'color: inherit; background: inherit; padding: inherit;',
    ];
  };

  const format = message => {
    return [
      `%c[${get_time()}]%c ${message}`,
      'font-size: 0.9em; font-family: monospace; opacity: 0.8;',
      'color: inherit; background: inherit; padding: inherit;',
    ];
  };

  const group = label_formatter => group_label => f => {
    console.group(...label_formatter(group_label));
    f(() => console.groupEnd());
  };

  return {
    format: format,
    group: group(format),
    group_rmex: group(rmex_formatter),
  };
})();

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
