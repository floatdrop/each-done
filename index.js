'use strict';
var asyncDone = require('async-done');
require('setimmediate');

module.exports = function (arr, next, cb) {
    var failed = false;
    var count = 0;

    cb = cb || function () {};

    if (!Array.isArray(arr)) {
        throw new TypeError('First argument must be an array');
    }

    if (typeof next !== 'function') {
        throw new TypeError('Second argument must be a function');
    }

    var len = arr.length;

    if (!len) {
        cb();
        return;
    }

    function callback(err) {
        if (failed) {
            return;
        }

        if (err !== undefined && err !== null) {
            failed = true;
            cb(err);
            return;
        }

        if (++count === len) {
            cb();
            return;
        }
    }

    for (var i = 0; i < len; i++) {
        setImmediate(asyncDone, next.bind(this, arr[i], i), callback);
    }
};
