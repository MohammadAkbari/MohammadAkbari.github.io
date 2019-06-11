---
title: Promise
---

> A promise is an object that is waiting for an asynchronous operation to complete, and when that operation completes, the promise is either fulfilled or rejected. A promise object can be any of these three states:
- Fulfilled – when the promise succeeds
- Rejected – when the promise fails
- pending
>
> A pending promise may transition into a fulfilled or rejected state, and the promise is considered to be settled when it’s either fulfilled or rejected. It is important to note a settled promise is immutable, which means that once a promise is settled, it cannot be resettled.
> ES6 has native support for promises.

## Arrow Functions

> Cannot bind a new object to the arrow function.With an arrow function, calls to bind, call, or apply will not be able to change to value of this.
>
> The value of this, super, arguments, and new.target inside a function is the nearest containing nonarrow function.

> How Much Use Is There for Arrow Functions?
- Use function in the global scope and for Object.prototype properties
- Use class for object constructors.
- Use => everywhere else.