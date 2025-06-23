---
layout: "post"
title: "Yarn, the better NPM?"
---

Yarn is a new package manager for JavaScript which can be used as substitute of NPM developed by Facebook and Google. I tried it out and want to share my first experiences with it which are not already presented at their homepage.

<!--more-->

Positives:

* Can be used as substitute of NPM, it uses the `package.json` and the NPM registry
* Creates a `.lock` file with the actual installed versions of the dependencies to ensure the next install will use the same
* Performance, especially if there are already things cached
* Some packages needs a flatten structure (e.g. `eslint-config-airbnb` with `eslint-plugin-import`)

Negatives:

* It doesn't execute `postinstall` scripts
* Flatten most dependencies, keep the tree structure only for different dependency versions. Can broken things which expect tree structure (e.g. `bin` scripts)

## Conclusion

The `.lock` file can make a difference by simplifying the deployment workflow and make it more stable and the disadvantages are more edge cases.

So it can be worth it to have a look at it, but its not the next big thing makes all smart until now.
