---
layout: "post"
title: "Using third party libraries or write your own"
---

Using third party libraries or not is a hard decision for beginners. The advantages are not immediately visible in the first time and its so much faster to just start with exactly what you need.

<!--more-->

## The progress of the first project

* Mix code with HTML into one file per page and have fast visible results
* After making few pages we don't want to copy the navigation into all pages, so we exclude them into own file and include everywhere
* Later we realize we have to much logic in our mixed files, so we exclude the logic into own files and include the HTML mix file at the end for the output

So what do we have then?

* Separate controller and views
* View logic with separating and including partials

In Node.js we would have the same after minutes: Express for controller and view separating together with a template engine for the view logic. And not only MVC. For many problems are solutions already available.

With using common libraries we get a few other advantages:

* They are well tested and optimized
* Evaluating different solutions and the learning curve costs time at beginning, saves time later to extend and maintain the application
* They are flexible and small, better chance to be able to reuse them
* There are tutorials, extensions and help available
* The chance new developers have already experience with them

## Summary

So using a third party library or write your own is at the end not a question. Use libraries which solve the problems, extend them where its needed and focus on your business logic and the real thing you want to develop.
