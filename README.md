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

See test cases for more examples.
