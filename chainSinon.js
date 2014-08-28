var sinon = require("sinon");

// Make a sinon stub for calls of the form: methodOne().methodTwo()
//
// Parameters:
//
//   object: The object to add the properties to. (defaults to {}, and makes them
//           up from whole cloth, otherwise)
//
//   callstring: A string, or array of strings. Each string is a dot separated
//               list of methods (ie, one.two). Each string/method will be added
//               to the resulting object.
//
// Returns an object with keys defined for each method, pointing to a stub:
//
// {
//   one: sinon.stub(),
//   oneObj: [ Object == one ],
//   one.two: sinon.stub(),
//   one.twoOBj: [ Object == one.two ]
// }
var stubCalls = function(firstParam, additionalParams) {
	var callstring, i, methodsFromObject, object;
	if (additionalParams == null) additionalParams = null;
	object = {};
	methodsFromObject = null;
	if (additionalParams === null) {
		callstring = firstParam;
	} else {
		methodsFromObject = firstParam;
		callstring = additionalParams;
	}
	if (Array.isArray(callstring)) {
		i = 0;
		while (i < callstring.length) {
			stubChainedCall(object, callstring[i], methodsFromObject);
			i++;
		}
	} else {
		stubChainedCall(object, callstring, methodsFromObject);
	}
	return object;
};

var stubChainedCall = function(object, callstring, methodsFromObject) {
	var arrayOfMethods, i, parentObject, path;
	if (methodsFromObject == null) methodsFromObject = null;
	arrayOfMethods = callstring.split(".");
	path = "";
	parentObject = new Object;
	i = 0;
	while (i < arrayOfMethods.length) {
		path += arrayOfMethods[i];
		if (!(path in object)) {
			if (methodsFromObject && i === 0) {
				object[path] = sinon.stub(methodsFromObject, path);
			} else {
				object[path] = sinon.stub();
			}
			object[path + "Obj"] = new Object;
			object[path].returns(object[path + "Obj"]);
		}
		if (parentObject !== null) parentObject[arrayOfMethods[i]] = object[path];
		parentObject = object[path + "Obj"];
		if (i < arrayOfMethods.length - 1) path += ".";
		i++;
	}
	return object;
};

module.exports = stubCalls;
