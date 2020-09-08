# SpookedCMS

![Build](https://img.shields.io/github/workflow/status/danielsolartech/spooked-cms-template/Node.JS)
[![License](https://img.shields.io/github/license/danielsolartech/spooked-cms-template)](./LICENSE)
![Version](https://img.shields.io/github/package-json/v/danielsolartech/spooked-cms-template)
![Code Size](https://img.shields.io/github/languages/code-size/danielsolartech/spooked-cms-template)

CMS Template for Node.JS

## Table of Contents
* [Getting Started](#Getting-Started)
  * [Setting File](#Setting-File)
  * [Warnings](#Warnings)
* [License](#License)
* [Contributors](#Contributors)

## Getting Started
First, you need build the source code to use the console arguments; for this, run `npm run build` and then you can use `npm start` or `node ./dist/index.js (flags)`. 

### Setting File
You need set a settings file in the root directory, by default it must be in `/settings/general.json`, but you can put it in other rute and then use `node ./dist/index.js -s ./new_path` to set the new rute of the settings file.

```
{
  // Database connection
  "database": {
    // You can choose between `mysql` and `mongodb`.
    "type": "mysql",

    // The host of your database.
    "host": "localhost",

    // The port of your database host.
    "port": 3306,

    // The username of your database account.
    "user": "root",

    // The password of your database account.
    "password": "",

    // The name of your database (OPTIONAL).
    "name": "spooked"
  }
}
```

### Warnings
When the application set the default values in the configuration it shows you a warning to advice you about this, you can ignore this messages using the `--no-warnings` flag.

## [License](./LICENSE)

## Contributors
* **Daniel Solarte** [GitHub](https://github.com/danielsolartech)
