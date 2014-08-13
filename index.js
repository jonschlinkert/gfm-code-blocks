/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var re = require('gfm-code-block-regex')();

module.exports = function(str) {
  var arr = [];

  while(re.exec(str)) {
    arr.push({
      lang: RegExp.$2,
      code: RegExp.$3
    });
  }
  return arr;
};