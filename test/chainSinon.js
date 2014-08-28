var expect = require("chai").expect;
var chainSinon = require("../chainSinon");

describe("chainSinon", function() {

	it("stubs one call", function() {
		var stubs = chainSinon("one");
		expect(stubs.oneObj).to.be.an("object");
		expect(stubs.one()).to.be.an("object");
	});

	it("stubs a string with multiple calls", function() {
		var stubs = chainSinon("first.second.third");
		expect(stubs.first()).to.be.an("object");
		expect(stubs.first().second()).to.be.an("object");
		expect(stubs.first().second().third()).to.be.an("object");
		expect(stubs.firstObj).to.be.an("object");
		expect(stubs["first.secondObj"]).to.be.an("object");
		expect(stubs["first.second.thirdObj"]).to.be.an("object");
	});

	it("stubs an array of strings", function() {
		var stubs = chainSinon(["one.thing", "another"]);
		expect(stubs.one()).to.be.an("object");
		expect(stubs.one().thing()).to.be.an("object");
		expect(stubs.another()).to.be.an("object");
		expect(stubs["one.thingObj"]).to.be.an("object");
		expect(stubs["anotherObj"]).to.be.an("object");
	});

	describe("custom objects", function() {
		var TestObject = (function() {
			function TestObject() {}
			TestObject.prototype.a = function() {
				return 'a';
			};
			TestObject.prototype.b = function() {
				return 'b';
			};
			return TestObject;
		})();

		it('stubs methods of the object', function() {
			var obj = new TestObject();
			var stubs = chainSinon(obj, ["a", "b"]);
			stubs.a.returns(4);
			expect(stubs.aObj).to.be.an("object");
			expect(stubs.bObj).to.be.an("object");
			expect(obj.a()).to.equal(4);
		});

		it('stubs sub-methods of the object', function() {
			var obj = new TestObject();
			var stubs = chainSinon(obj, ["a.b.c", "b"]);
			stubs['a.b.c'].returns(4);
			expect(stubs["a.b.cObj"]).to.be.an("object");
			expect(obj.a().b().c()).to.equal(4);
		});

		it('restores to the original implementation', function() {
			var obj = new TestObject();
			var stubs = chainSinon(obj, "a.b.c");
			// restoring brings back the original implementation:
			expect(obj.a()).to.be.an("object");
			obj.a.restore();
			expect(obj.a()).to.equal('a');
		});
	});
});
