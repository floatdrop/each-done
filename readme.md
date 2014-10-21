# each-done [![Build Status](https://travis-ci.org/floatdrop/each-done.svg?branch=master)](https://travis-ci.org/floatdrop/each-done)

> Async concurrent iterator (async forEach)

Inspired by [eachAsync()](https://github.com/sindresorhus/each-async), but with [async-done](https://github.com/phated/async-done) inside.

## Install

```sh
$ npm install --save each-done
```


## Usage

```js
var each = require('each-done');

each(['foo','bar','baz'], function (item, index, done) {
	console.log(item, index);
	done();
}, function (error) {
	console.log('finished');
});
//=> foo 0
//=> bar 1
//=> baz 2
//=> finished
```


## API

### eachAsync(array, callback, finishedCallback)

#### array

The array you want to iterate.

#### callback(item, index, done)

A function which is called for each item in the array with the following arguments:

- `item`: the current item in the array
- `index`: the current index
- `done([error])`: call this when you're done with an optional error. Supplying anything other than `undefined`/`null` will stop the iteration.

Note that order is not guaranteed since each item is handled concurrently.

You can return Promise or Stream from callback function instead of calling `done` argument - then callback will be reloved as soon as Stream emits `end` or Promise will be resolved.

#### finishedCallback(error)

A function which is called when the iteration is finished or on the first error. First argument is the error passed from `done()` in the `callback`.

## License

MIT © [Vsevolod Strukchinsky](floatdrop@gmail.com)
