---
layout: "post"
title: "Split configuration and code"
---

Applications needs configuration depends on the environment, e.g. the credentials of a database. Lets have a look at different approaches solving this requirement, their pros and cons.

<!--more-->

## All Configuration files in the repository

```
/configs
  default.json
  dev.json
  stage.json
  prod.json
```

In this approach we define an application configuration file `default.json`, which will be always used, and one for every environment `dev.json`, `stage.json` and `prod.json`, which will be only used in the actual environment.

Pros:

* Easier to installing multiple times the same environment and ensure the consistence
* Code changes and new needed configuration can be done in the same step
* Version control give the overview about configuration changes

Cons:

* Have access to the code means have access to all configuration, also the critical ones like database credentials
* Add or modify environment configuration need changes in the repository and new code deploy

## Write configuration file during deploy

```
/configs
  default.json
  env.json
```

In this approach we define an application configuration file `default.json`. During the deploy we create another configuration file `env.json` which is filled by the actual environment configuration.

Pros:

* The repository doesn’t care about the different environments
* Having only access to the code doesn't result in having access to the critical configuration

Cons:

* Deploy needs to care about create the `env.json` file
* There must be a separated history available about the changes of the environment configuration

## Use environment variables

```
process.env in JavaScript
getenv() in PHP
```

They are a common way to give an application variables from the environment. In Node.js they can be set by the CLI command starting the application. In PHP they can be set by `php.ini`, vhost or `.htaccess`.

The large pros comes with the support by the hosting service. Heroku offers a web UI to set/modify the environment variables, show a history of all changes and allow to revert them.

Pros:

* Its a common way for all languages and supported by all cloud providers
* Environment configuration is separated from the code and can easily changed
* Changes are tracked and revertable
* Its possible to create new apps with another environment configuration without code changes
* Access to the code and access to the environments can separately given

## Summary

Use environment variables is the most flexible, secure and maintainable approach, but needs some support if the tracking and reverting is needed.
