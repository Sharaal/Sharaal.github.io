---
layout: "post"
title: "If Heroku free is to small and hobby to large"
---

Sometimes apps should neither sleep nor use free dyno hours. Sometimes apps doesn't get many requests to need the performance of a hobby dyno.

<!--more-->

What if it would be possible many of these apps could combined run on a single hobby dyno?

Besides that we also want to let the apps located in their own GitHub repos and standalone runnable. The first requirement is easy solvable, we publish them as NPM packages. For the second we use a small trick, we will see later.

## Prepare the apps

We want to reuse the app variable in another app. So the app must not listen on the port on their own, but get exported. To determine if the app is running standalone or required by another app we can use `module.parent`:

```javascript
if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
```

Additionally we must ensure the apps are runnable in another app or more specific, runnable if the working directory is not the app directory, because the app will be located under `node_modules` if using as NPM dependency. To solve this we use `__dirname` if we reference the filesystem:

```javascript
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../www')));
```

Last but not least we want to ensure the app also works if the URL has a path, so everywhere we need an URL to another part of the app we use `req.originalUrl`. If we need an absolute URL we additionally use `req.get('host')`:
```javascript
res.render('index', { host: req.get('host'), url: req.originalUrl });
```

If we are finished, we publish the app by NPM.

## Setting up the proxy app

The proxy is an own app, reference all apps we want to run as dependency:

```json
  "dependencies": {
    "@dragonprojects/sharaal": "^1.0.0"
  }
```

Now the trick, we distribute the incoming requests to the apps by a path or optionally by the host which is requested:

```javascript
const sharaal = require('@dragonprojects/sharaal');
proxy.use('/sharaal', sharaal);
proxy.use(require('vhost')('www.sharaal.de', sharaal));
```

## Configure the hosting

We create a new app in Heroku and deploy the proxy.

If we don't have own domains for the apps, we are finished now, we can request the app by "/sharaal".

Otherwise we add the domain "www.sharaal.de" in the settings:
![App Domain Setting](/assets/images/2017-5-23-if-heroku-free-is-to-small-and-hobby-to-large/app-domain-setting.png)

Configure the domain "sharaal.de" to redirect to "www.sharaal.de" and add a CNAME entry targeting the DNS name of our proxy app "www.sharaal.de.herokudns.com":
![Hosting Redirect](/assets/images/2017-5-23-if-heroku-free-is-to-small-and-hobby-to-large/hosting-redirect.png)
![Hosting CNAME](/assets/images/2017-5-23-if-heroku-free-is-to-small-and-hobby-to-large/hosting-cname.png)
Why not add the CNAME entry to the domain? Because all traffic will be redirected by a CNAME entry, not only http requests, also e-mails if we want to use the domain also for them.

## Summary

If we done all right we have now different still standalone runnable and located apps, combined to a single heroku app (which gets the hobby upgrade) and requestable by own domains:

* [sharaal.de](http://sharaal.de) - [http://github.com/sharaal/sharaal](http://github.com/sharaal/sharaal)
* [maxdome-rssfeeds.de](http://maxdome-rssfeeds.de) - [http://github.com/sharaal/maxdome-rssfeeds](http://github.com/sharaal/maxdome-rssfeeds)

The complete workflow in a diagramm:
![Complete Workflow](/assets/images/2017-05-23-if-heroku-free-is-to-small-and-hobby-to-large/complete-workflow.png)
