# The Witch's Workshop • Plug-ins

## Installation

> This page describes the different steps that are required in order to build 
> the environments in which the plugins' present in this repository can be use.


### Development environment

1. **Clone this repository** inside the project's plug-ins directory (`js/plugins`) <br/>
   | `git clone https://github.com/random-mode/witch-workshop.plug-ins {{MV_PROJECT_PATH}}/js/plugins/witch-workshop.plug-ins`
2. **Copy the [`project-plugins-loader.js`](.integration/project-plugins-loader.js) script** in the plug-ins' directory (`js/plugins`) <br />
   – _This script will handle the boilerplate of loading this repository plug-in's_
3. Open **RPG Maker MV** and **enable the previous _script_** <br />
   – _Depending on the name you used when cloning this repository, you might have to set the `Plugins' directory` parameter accordingly_

Then, by opening the developer console (`F12`), you should see that your own plug-ins are loaded right when the game starts.

This solution comes-up with a certain drawback as _plug-ins_ are no longer handled by the editor itself.
Thus, there's no way to edit our plug-ins' parameters within the editor.


### Production environment

> {{ TODO }}

---
[`Return to homepage [↵]`](https://github.com/random-mode/witch-workshop.plug-ins)
