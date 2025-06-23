---
layout: "post"
title: "Write async code in JavaScript"
---

In a past article I described the [async behavior in JavaScript](/2018/01/25/async-behavior-in-javascript.html). To write async code there are a lot of different options and every few months it switches to another. That results in every new project use another, or even worse every part of one project.

<!--more-->

So I give here a small overview over the different options with their pros and cons.

## Callbacks

Callbacks are functions which we hand over to another functions which calls them immediately after some blocking operations (sync) or at the end of the event loop, maybe not until an event is triggered (async).

In JavaScript its a common behavior a callback gets called not only if something is finished successfully, also if some
error happens to give the possibility to handle that error. Because of this its common a callback function gets the
error as first parameter, which needs to be checked.

```javascript
doSomething((err, data) => {
  if (err) {
    console.log('doSomething finished with an error');
    return;
  }
  console.log('doSomething is successfully finished');
});
```

Pros:

* Easy to use in easy scenarios

Cons:

* Errors must be handled in every callback function
* The parameters of a callback are only by convention error and data, not all callbacks rely on that
* Gets really fast unreadable in nested scenarios (naming "callback hell"):

```javascript
doSomething((err, data) => {
  if (err) {
    console.log('First doSomething finished with an error');
    return;
  }
  console.log('First doSomething is successfully finished');
  doSomething((err, data) => {
    if (err) {
      console.log('Second doSomething finished with an error');
      return;
    }
    console.log('Second doSomething is successfully finished');
  });
});
```

* Gets even more complicated if things should run in parallel and things should run after that:

```javascript
const results = [];

doSomething((err, data) => {
  if (err) {
    console.log('One doSomething finished with an error');
  } else {
    console.log('One doSomething is successfully finished');
  }
  results.push({ err, data });
  if (results.length === 2) {
    console.log('Both doSomething are finished');
  }
});

doSomething((err, data) => {
  if (err) {
    console.log('One doSomething finished with an error');
  } else {
    console.log('One doSomething is successfully finished');
  }
  results.push({ err, data });
  if (results.length === 2) {
    console.log('Both doSomething are finished');
  }
});
```

## "async" package

The ["async" package](https://www.npmjs.com/package/async) solves the most problematical aspects of writing async code only with callbacks. Especially a sequence of depending async functions or parallel execution of async functions is a lot easier with it. But as it is only a wrapper around callbacks, it can not fix all the problems.

```javascript
async.parallel([
  doSomething,
  doSomething,
], function(err, results) {
  if (err) {
    console.log('One doSomething finished with an error');
    return;
  }
  console.log('Both doSomething are successfully finished');
});
```

Pros:

* Sequence and parallel executions is a lot easier

## Promises

Promises are a new standard to write async code. They standardize the success and failure scenario, allow easily chaining and parallelism and become better and better supported.

Pros:

* Chain promises allows a more central error handling

```javascript
doSomething(data)
  .then(data => { console.log('First doSomething is successfully finished'); })
  .then(data => doSomething(data))
  .then(data => { console.log('Second doSomething is successfully finished'); })
  .catch(err => { console.log('One doSomething finished with an error'); });
```

* Also parallelism are easier

```javascript
Promise.all([
  doSomething,
  doSomething,
])
  .then(data => { console.log('Both doSomething are successfully finished'); })
  .catch(err => { console.log('One doSomething finished with an error'); });
```

Cons:

* Errors must be handled in every chain
* A lot of callbacks are still in use which makes promises very verbose

## "co" package

The ["co" package](https://www.npmjs.com/package/co) fits in the time niche between callbacks, promises and async/await. It wraps all async code and allows to write it in a sync way by using generator functions and `yield`. But with the support of async/await it is not anymore needed.

Pros:

* Write async code like it would be sync code
* Throw errors and let us use try/catch for error handling

Cons:

* It is need to wrap a lot of code
* Not needed anymore, use async/await

## async/await keywords

```javascript
try {
  const data = await doSomething();
  console.log('doSomething is successfully finished');
} catch (e) {
  console.log('doSomething finished with an error');
}
```

Pros:

* Native keywords for flow control (if, for/while) and error handling (try/catch)
* No boilerplate and callbacks results in compact code which can be better readable

Cons:

* Promises are not completely abstracted (e.g. Promise.all is needed for parallelism)
* Not all libraries (especially the Node.js standard libraries) support promises
* It is needed to keep in mind code looks sync, but it is and behave still async
