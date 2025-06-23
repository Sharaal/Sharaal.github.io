---
layout: "post"
title: "Open Graph Tags for Facebook"
---

Facebook has the feature to show a summary of a webpage by writing the URL into a post. I will describe which information Facebook use and how its possible to change them.

<!--more-->

## Facebook standard behavior

If an user write a URL into a post, Facebook makes a GET request to this URL. If no Open Graph Tag exists Facebook use the title, the meta description of the webpage and the user written URL.

## Define an Open Graph Tag

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="Title" />
<meta property="og:description" content="Description" />
<meta property="og:url" content="URL" />
<meta property="og:image" content="path/to/an/image.png" />
```

With Open Graph Tags its possible to define what Facebook use to have other information in case of title, description and URL and and additional information in case of an image.

## Choose the language of the user

Its possible to provide the information in the language of the Facebook user. For this feature there are two parts must be added:

* The current language and the list of the available languages for the webpage as Open Graph Tags

```html
<meta property="og:locale" content="de" />
<meta property="og:locale:alternate" content="en" />
```

* Parsing the HTTP request header for the "X-Facebook-Locale" header and provide the information in the Open Graph Tags in this given language

## Summary

Define Open Graph Tags allow to modify and extend the information Facebook use for the posted summary of the webpage.
