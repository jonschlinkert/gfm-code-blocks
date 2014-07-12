/*!
 * fenced-code-blocks <https://github.com/jonschlinkert/fenced-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var file = require('fs-utils');
var code = require('..');

var fixtures = function (filepath) {
  return file.readFileSync('test/fixtures/' + filepath + '.md');
}

describe('code', function () {
  it('should parse gfm code blocks', function () {
    var actual = code(fixtures('README'));
    console.log(actual)
    // assert(code(fixtures('README')));
  });
});