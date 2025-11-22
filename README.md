# How to create a post

Because the blog use [jekyll](http://jekyllrb.com/) every post is just a file in the `_posts` directory.

1. Create a new file in the `_posts` directory
2. The filename must have the format `date-title.md`, e.g.: `2021-10-13-example.md`
3. The content must start with a Front Matter, e.g.:
```
---
layout: post
title: Example
---
```
4. Write your content in [markdown](https://en.wikipedia.org/wiki/Markdown)
5. Commit the file via new branch and pull request to let someone review it before publishing
6. https://sharaal.github.io/ will be automatically updated after merging the pull request with the new post
