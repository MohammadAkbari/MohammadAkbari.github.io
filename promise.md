---
title: SHEEP
---

<div class="jumbotron">
    <h1>Promise</h1>
    <p class="lead">A promise is an object that is waiting for an asynchronous operation to complete, and when that operation completes,
        the promise is either fulfilled or rejected. A promise object can be any of these three states:</p>
    <p>
        <ul class="list-group">
            <li class="list-group-item">Fulfilled – when the promise succeeds</li>
            <li class="list-group-item">Rejected – when the promise fails</li>
            <li class="list-group-item">pending</li>
        </ul>
    </p>
    <p>A pending promise may transition into a fulfilled or rejected state, and the promise is considered to be settled
        when it’s either fulfilled or rejected. It is important to note a settled promise is immutable, which means
        that once a promise is settled, it cannot be resettled.</p>
    <p>ES6 has native support for promises.</p>
    <button id="button" class="btn btn-primary btn-lg btn-block" type="button">Button</button>
</div>

<div class="jumbotron">
    <h1>Arrow Functions</h1>
    <p class="lead">Cannot bind a new object to the arrow function.With an arrow function, calls to bind, call, or apply will not
        be able to change to value of this.</p>
    <p class="lead">The value of this, super, arguments, and new.target inside a function is the nearest containing nonarrow function.</p>
    <h3>How Much Use Is There for Arrow Functions?</h3>
    <p>
        <ul class="list-group">
            <li class="list-group-item">Use function in the global scope and for Object.prototype properties.</li>
            <li class="list-group-item">Use class for object constructors.</li>
            <li class="list-group-item">Use => everywhere else.</li>
        </ul>
    </p>
</div>