'use strict';

// Ordered enumeration of project's plugins
Project.plugins = [
  Project.Plugin('sample', 'sample.plugin/sample.js', [
    'sample.plugin/modules/random.js',
  ]),
];
