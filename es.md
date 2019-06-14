---
title: JavaScript
---

## Closures

> A closure is a function having access to the parent scope, even after the parent function has closed.
>
> A closure is the combination of a function and the lexical environment within which that function was declared. This environment consists of any local variables that were in-scope at the time the closure was created.

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
