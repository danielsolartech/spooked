# spooked-cms-template

[![License](https://img.shields.io/github/license/danielsolartech/spooked-cms-template)](./LICENSE)
![Version](https://img.shields.io/github/package-json/v/danielsolartech/spooked-cms-template)
![Code Size](https://img.shields.io/github/languages/code-size/danielsolartech/spooked-cms-template)

CMS Template for Node.JS

## Getting started

### Settings/general.json
You need configure this file (Create it if is necessary).
```
{
  // Database connection
  "database": {
    // You can choose between `mysql` and `mongodb`.
    "type": "mongodb",

    // The host of your database.
    "host": "localhost",

    // The port of your database host.
    "port": 3306,

    // The username of your database account.
    "user": "root",

    // The password of your database account.
    "password": "daniel1",

    // The name of your database (OPTIONAL).
    "name": "spooked"
  }
}
```

## [License](./LICENSE)

## Contributors
* **Daniel Solarte** [GitHub](https://github.com/danielsolartech)
