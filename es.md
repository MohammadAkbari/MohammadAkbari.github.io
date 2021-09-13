---
title: JavaScript
---

## Closures

> A closure is a function having access to the parent scope, even after the parent function has closed.
>
> A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

### ws
```js
let ws = new WebSocket("wss://example.com");
ws.onmessage = message => console.log(`Received: ${message.data}`);

ws.addEventListener('open', function (event) {
    console.log(`Here`);
});//https://javascript.info/websocket
```

### sample 1
```js

var add = (function () {
	var counter = 0;
	return function () {counter += 1; return counter}
})();

add();
add();
add();

// the counter is now 3
```
		
### sample 2
```js

function makeAdder(x) {
	return function(y) {
		return x + y;
	};
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

## call, apply, bind

```js

var product = (x, y) => x * y;

console.log(product.call(null, 2, 3));
console.log(product.apply(null, [4, 5]));
var multiply = product.bind(null, 6, 7);
console.log(multiply ());

```
## ajax call

```js

(function ($) {
    var url = "";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json"
    }).done(function (response) {
    }).fail(function (response) {
    });
})(jQuery);

```

## Promise

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
>
> How Much Use Is There for Arrow Functions?
- Use function in the global scope and for Object.prototype properties
- Use class for object constructors.
- Use => everywhere else.

## Element event handlers
```js
$._data($("#btn").get(0), "events")["click"][1].handler()
```
