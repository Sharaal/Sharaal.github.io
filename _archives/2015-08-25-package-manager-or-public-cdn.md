---
layout: "post"
title: "Package manager or public CDN"
---

There are many approaches to load third party JavaScript and CSS files. I will describe two of them and a solution to combine both to have most of the advantages.

<!--more-->

## Package Manager

A package manager like Bower can be used to load all dependencies (and the dependencies of the dependencies) during the build time.

Advantages:

* The dependencies are not checked in under the version control, only the list which dependencies in which version
* Wildcard version numbers can be used to get automatically new minor or patch versions
* The package manager does the lookup for the compatible dependencies of the dependencies and load them

But there is a large disadvantage. All the dependencies will be hosted by your own. The first page view will be slow, the browser must download all dependencies. If the dependencies are bundled with the own JavaScript the browser needs only load one file, but can't cache them separately.

## Public CDN

Using public CDN means load the third party JavaScript and CSS with the HTML tags (script and link) from a host which is used by many other websites.  The important advantages is: the chance common libraries are already cached is high and the browser doesn't need to load them.

But there are a few disadvantages:

* The version number is defined in the URL for the assets. So hardcode the URL means hardcode the used versions
* Loading JavaScript with HTML tags means not able to use CommonJS modules

## Combine the two approaches

For widely used libraries with available public CDN its possible to combine the two approaches: Use public CDN URLs but with a variable version number filled in by a package manager.

1. Define the list of the dependencies and their versions for the package manager:

```json
{
    "dependencies": {
        "jquery": "^2.1.3"
    }
}
```

2. Define the URL to the public CDN with a placeholder for the version number:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/{{ bower.jquery }}/jquery.min.js"></script>
```

3. Read the version from the local library loaded with the package manager (e.g. /bower_components/jquery/.bower.json) and fill the placeholder with it:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
```

Now the third party libraries will always be loaded from the public CDN URLs in the version which is currently chosen by the package manager.

## Summary

The combination gives the most advantages of both approaches. The package manager cares about the actual used versions and the public CDN speeds up the first page view.

But it needs a bit of rethinking how to work with third party libraries without using their CommonJS modules.

At the end its a tradeoff: Get the speed and the overview of using CommonJS modules only for the own code against the possibility to use different versions of the same library which is allowed in a complete CommonJS environment.
