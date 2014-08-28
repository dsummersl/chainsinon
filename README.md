chainsinon
==========

A [Sinon](http://sinonjs.org) utility function to return complex stubbed objects.

[![build status](https://secure.travis-ci.org/dsummersl/chainsinon.png)](http://travis-ci.org/dsummersl/chainsinon)

Install
=======

Use npm:

    npm install --save-dev chainsinon

Usage
=====

The chainsinon function [stubs](http://sinonjs.org/docs/#stubs) an arbitrary
list of functions on an object. For example:

```javascript
var chainsinon = require("chainsinon");

var mockObject = chainsinon("mainMethod.subFunction.subSubFunction");

// One can then call any of the functions mentioned:
mockObject.mainMethod();
mockObject.mainMethod().subFunction().subSubFunction();

// Each mocked method is a sinon stub. You can apply custom behavior or
// verifications on the objects as per usual...
mockObject["mainMethod.subFunction.subSubFunction"].returns(4);

// so this now returns 4:
mockObject.mainMethod().subFunction().subSubFunction();

// call counts are of course respected:
mockObject["mainMethod"].called;    // == true
mockObject["mainMethod"].callCount; // == 3 (three times so far)
```

This also works for an arbitrary number of methods:

```javascript
var chainsinon = require("chainsinon");

var mockObject = chainsinon([
    "one.subOne",
    "two"
]);

mockObject.one().subOne();
mockObject.two();
```

Also, you can use this library to nest an arbitrary object in a nested way:

```javascript
var chainsinon = require("chainsinon");

function TestObject() {}
TestObject.prototype.a = function() { return 'a'; };

var instance = new TestObject();
// instance returns the expected value:
instance.a(); // == a

// now its mocked:
var mockObject = chainsinon(instance, "a");
mockObject.a.returns(4);
mockObject.a(); // == 4

// instance returns the expected value:
mockObject.a.restore();
mockObject.a(); // == a
```


See test cases for more examples.
