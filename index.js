/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var re = require('gfm-code-block-regex')();

module.exports = function(str) {
  var arr = [];
  while(re.exec(str)) {
    arr.push({
      lang: RegExp.$3,
      code: RegExp.$5,
      block: RegExp.$1
    });
  }
  return arr;
};
