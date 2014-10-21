/* global it */
'use strict';
var assert = require('assert');
var each = require('./');
var through = require('through2');

it('async tasks will run parallelly', function (done) {
	var fixture = [1,2,3,4,5,6,7,8,9,10];
	var actual = [];
	each(fixture, function (el, i, next) {
		setTimeout(function () {
			actual.push(el);
			next();
		}, Math.random() * 2000);
	}, function () {
		assert.equal(actual.length, fixture.length);
		assert.notDeepEqual(actual, fixture);
		done();
	});
});

it('async tasks should support Streams', function (done) {
    var fixture = [1];
    var actual = [];
    each(fixture, function (el) {
        var stream = through.obj();
        setTimeout(function () {
            actual.push(el);
            stream.end();
        }, Math.random() * 2000);
        return stream;
    }, function () {
        assert.equal(actual.length, fixture.length);
        done();
    });
});


it('stop iteration on first error', function (done) {
	var j = 0;
	each([1,2,3], function (el, i, next) {
		j++;
		next(true);
	}, function () {
		assert.strictEqual(j, 1);
		done();
	});
});
