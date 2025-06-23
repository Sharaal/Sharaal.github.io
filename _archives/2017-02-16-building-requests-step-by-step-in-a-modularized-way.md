---
layout: "post"
title: "Building requests step by step in a modularized way"
---

Requests to APIs can be very complex and need a lot of options: hostname, API keys, session tokens and at the end the HTTP method, route to the resource, parameters and so on.

<!--more-->

I thought about how to solve this requirement in a flexible and modular way, because the complexity in the connector to make Heimdall (= the API of maxdome) requests exploded by adding more and more.

## Request options

A normal Heimdall requests to get some asset data need a lot of different options, some of them should be defined one time for the whole app (hostname, headers, apikey, appid), some of them are needed for all requests of the same type (method, path), some of them only for this one request (filters).

```javascript
const options = {
  headers: {
    accept: 'application/json',
    ...
  },
  json: true,
  url: 'https://heimdall.maxdome.de/api/v1/mxd/assets?apikey=apikey&amp;appid=appid&amp;filter%5B%5D=assetId~1',
  method: 'get'
}
```

## Modularize them

Now we want to define all request options step by step and at the end merge them together to make a request. For that I implemented [drequest](https://github.com/dnode/drequest) to solve this in an easy way and [drequest-maxdome](https://github.com/dnode/drequest-maxdome) to provide the needed options for Heimdall requests.

### maxdome options

Group all options which are needed to make requests to Heimdall in one object and set them as default for all requests.

```javascript
const maxdomeOptions = {
  headers: {
    accept: 'application/json',
    ...
  },
  json: true,
  url: {
    hostname: 'heimdall.maxdome.de/api',
    protocol: 'https',
    queries: [`apikey=apikey`, `appid=appid`]
  }
};

const maxdome = new RequestBuilder()
  .addNames('maxdome')
  .setOptions('maxdome', maxdomeOptions);
```

### Assets options

Group all options which are needed to get asset data from Heimdall and store them with a name to make it easily available.

```javascript
const assetsOptions = {
  method: 'get',
  url: { path: 'v1/mxd/assets' }
};

maxdome.setOptions('assets', assetsOptions);
```

### Request options

Now the maxdome request builder is ready to make a requests getting asset data. For all the possible filters, sortings and so on the assets endpoint provides there is the class "AssetQueryOptions" which can be initialized and simply used for a request.

```javascript
const assets = await maxdome.request('assets')
  .send(new AssetsQueryOptions(assetId));
```

## Summary

Voila, we are now able to build a connector step by step and easily make specific requests without handle everytime the whole bunch of options which are needed.

And the positive: To get asset data for a specific user, we only need to define how a session works at maxdome (session token in the header and customerId in some paths) ...

```javascript
class SessionOptions {
  constructor(session) {
    this.sessionId = session.sessionId;
    this.customer = {
      customerId: session.customer.customerId,
    };
  }

  toRequestOptions(options) {
    return {
      headers: {
        'mxd-session': this.sessionId,
      },
      url: {
        path: options.url.path.replace('%customerId%', this.customer.customerId),
      },
    };
  }
}
```

... and use the session of the user for the request ...

```javascript
const assets = await maxdome.request('assets')
  .send([new AssetsQueryOptions(assetId), new SessionOptions(session)]);
```

Cool, or isn't it? :)
