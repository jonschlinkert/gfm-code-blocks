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
  var match = null

  while (match = re.exec(str)) {
    arr.push({
      start: match.index,
      end: match.index + match[1].length,
      lang: match[3],
      code: match[5],
      block: match[1]
    });
  }
  return arr;
};
