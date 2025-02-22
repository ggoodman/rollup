(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.myBundle = factory());
})(this, (function () { 'use strict';

	function foo () {
		var Object = {
			keys: function () {
				console.log( 'side-effect' );
			}
		};

		var obj = { foo: 1, bar: 2 };
		Object.keys( obj );
	}

	foo();

	var main = 42;

	return main;

}));
