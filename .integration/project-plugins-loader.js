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

// Plug-in's setup
(function(context) {
  // Parameters' formatter
  const string = default_value => current_value => {
    return (current_value || '').trim() || default_value;
  };

  // Parameters' retrieval
  const parameters = PluginManager.parameters(Project.filename());
  const plugins_dir = string('witch-workshop.plug-ins/plugins')(
    parameters["Plugins' directory"]
  );
  const plugins_list_src = `${plugins_dir}/plugins.list.js`;

  const load_main_script = plugin => callback_once_loaded => {
    const src = `${plugins_dir}/${plugin.source}`;
    console.log(
      ...Project.log.format(
        `Loading main script of project's plugin: ${plugin.name} (${src})`
      )
    );
    Project.load_script(src)(callback_once_loaded);
  };

  const load_plugin = plugin => callback_once_loaded => {
    return () => {
      Project.log.group(`Loading project's plugin: ${plugin.name}`)(
        end_plugin_group => {
          load_main_script(plugin)(() => {
            end_plugin_group();
            callback_once_loaded();
          });
        }
      );
    };
  };

  const load_plugins_synchronously = callback_once_finished => {
    return () => {
      if (Array.isArray(Project.plugins)) {
        Project.plugins.reverse().reduce(
          (Σ, p) => load_plugin(p)(Σ),
          () => {
            console.log(
              ...Project.log.format("Project's plugins load is complete")
            );
            callback_once_finished();
          }
        )();
      } else {
        console.log(
          ...Project.log.format(
            `${plugins_list_src}#Project.Plugin is wrongly formatted!`
          )
        );
        callback_once_finished();
      }
    };
  };

  Project.log.group_rmex(
    `Loading file containing the list of project's plugins: ${plugins_dir}/plugins.list.js`
  )(end_log_group => {
    const load_plugins = load_plugins_synchronously(end_log_group);
    Project.load_script(plugins_list_src)(load_plugins);
  });
})(this);
