# expander [![Build Status](https://secure.travis-ci.org/tkellen/node-expander.png?branch=master)](http://travis-ci.org/tkellen/node-expander)

> Expand template strings in declarative configurations.

## API

### get(data, lookup, imports)
Retrieve a value from the data object with all template strings resolved.

`data` a configuration object
`lookup` a dot-notated key
`options` sent to [_.template](http://lodash.com/docs#template) when resolving values.

Example:
```js
var data = {
  key: '<%= uppercase("foo") %>'
};
expander.get(data, 'key', {
  imports: {
    uppercase: function (str) {
      return str.toUpperCase();
    }
  }
}); // FOO
```

### getRaw(data, lookup)
Retrieve a literal value from the data object.

`data` a configuration object
`lookup` a dot-notated string representing a key in the configuration

### set(data, lookup, value)
Set a value in the data object.

`data` a configuration object
`lookup` a dot-notated string representing a key in the data
`value` the value to set

### process(data, lookup, options)
Resolve any arbitrary template string.

`data` a configuration object
`lookup` any string value, typically a template string, e.g. "<%= key %>"
`options` sent to [_.template](http://lodash.com/docs#template) when resolving values.

### interface(data, options)
Bind the above API to a provided data object so you can access it more succinctly.

`data` a configuration object
`options` sent to [_.template](http://lodash.com/docs#template) automatically when resolving values.

**Note:** When using the interface API, passing options to `get` or `process` will perform a shallow merge over `options` provided when the interface was instantiated.

Example:
```js
var configRaw = {
  key: 'value',
  keyRef: '<%= key %>'
};
var config = expander.interface(config);
config('key'); // value
config.get('key'); // value
config('keyRef'); // value
config.get('keyRef'); // value
config('key', 'changed'); // changed
config('key'); // changed
```

## Examples

```js
var expander = require('expander');

var data = {
  key: 'value',
  keyRef: '<%= key %>',
  recursiveKeyRef: '<%= keyRef %>',
  arrayRef: ['test', '<%= key %>'],
  recursiveArrayRef: ['test', '<%= arrayRef %>'],
  obj: {
    keyRef: '<%= key %>',
    recursiveKeyRef: '<%= keyRef %>',
    arrayRef: ['test', '<%= key %>'],
    recursiveArrayRef: ['test', '<%= arrayRef %>']
  },
  dotRef: '<%= obj.keyRef %>',
  objRef: '<%= obj %>',
  interpolated: 'test <%= key %>',
  interpolatedRecursiveRef: 'test <%= keyRef %>',
  methodRef: expander.fn(function (config) {
    // config is the entire config
    return config.key;
  }),
  methodRefContext: expander.fn(function (config) {
    // this is a reference to expander
    return this.get(config, 'keyRef');
  })
};

expander.get(data, 'keyRef'); // value
expander.get(data, 'recursiveKeyRef'); // value
expander.get(data, 'arrayRef'); // ['test', 'value']
expander.get(data, 'recursiveArrayRef'); // ['test', ['test', 'value']]
expander.get(data, 'obj'); // {
                           //   keyRef: 'value',
                           //   recursiveKeyRef: 'value',
                           //   arrayRef: ['test', 'value'],
                           //   recursiveArrayRef: ['test', ['test', 'value']]
                           // }
expander.get(data, 'objRef'); // {
                              //   keyRef: 'value',
                              //   recursiveKeyRef: 'value',
                              //   arrayRef: ['test', 'value'],
                              //   recursiveArrayRef: ['test', ['test', 'value']]
                              // }
expander.get(data, 'interpolated'); // test value
expander.get(data, 'interpolatedRecursiveRef'); // test value
expander.get(data, 'methodRef'); // value
expander.get(data, 'methodRefContext'); // value

// getter setter api
var config = expander.interface(data);
config('keyRef'); // value
config('recursiveKeyRef'); // value
config('arrayRef'); // ['test', 'value']
config('recursiveArrayRef'); // ['test', ['test', 'value']]
config('obj'); // {
               //   keyRef: 'value',
               //   recursiveKeyRef: 'value',
               //   arrayRef: ['test', 'value'],
               //   recursiveArrayRef: ['test', ['test', 'value']]
               // }
config('objRef'); // {
                  //   keyRef: 'value',
                  //   recursiveKeyRef: 'value',
                  //   arrayRef: ['test', 'value'],
                  //   recursiveArrayRef: ['test', ['test', 'value']]
                  // }
config('interpolated'); // test value
config('interpolatedRecursiveRef'); // test value
config('methodRef'); // value
config('methodRefContext'); // value
```

## Release History

* 2014-02-21 - v0.3.3 - allow overriding default options for _.template in interface api
* 2014-02-20 - v0.3.2 - allow passing options to _.template
* 2014-02-11 - v0.3.1 - interface emits events on set
* 2014-02-10 - v0.3.0 - support a getter/setter api
* 2013-12-15 - v0.2.2 - support auto expansion of functions
* 2013-11-21 - v0.2.1 - support ${value} strings
* 2013-11-08 - v0.2.0 - correctly handle recursively interpolated values
* 2013-11-05 - v0.1.0 - initial release
