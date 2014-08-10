/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var helpers = require('test-helpers')();
var code = require('..');


describe('code block', function () {
  it('should return the code blocks from the fixture.', function () {
    var readme = helpers.readFixture('README.md');
    var blocks = code(readme);

    assert.equal(Array.isArray(blocks), true);
    assert.equal(blocks.length, 3);
  });

  it('should get the language from a code block.', function () {
    var readme = helpers.readFixture('README.md');
    var blocks = code(readme);
    var lang = RegExp.$2;
    assert.equal(blocks[0].lang, 'bash');
  });

  it('should get a code block from a string.', function () {
    var blocks = code('\n```js\nfoo\n```\n');
    var lang = blocks[0].lang;
    var inner = blocks[0].code;
    assert.equal(lang, 'js');
    assert.equal(inner, 'foo');
  });

  it('should get a code block from a string.', function () {
    var blocks = code('\n```bash\nbar\n```\n');
    var lang = blocks[0].lang;
    var inner = blocks[0].code;
    assert.equal(lang, 'bash');
    assert.equal(inner, 'bar');
  });
});