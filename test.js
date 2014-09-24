/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var helpers = require('test-helpers')({dir: './'});
var code = require('./');


describe('code block', function () {
  it('should return the code blocks from the fixture.', function () {
    var readme = helpers.readFixture('README.md');
    var blocks = code(readme);
    assert.equal(Array.isArray(blocks), true);
    assert.equal(blocks.length, 5);
  });

  it('should get the language from a code block.', function () {
    var readme = helpers.readFixture('README.md');
    var blocks = code(readme);
    var lang = RegExp.$2;
    assert.equal(blocks[0].lang, 'bash');
  });

  it('should get a code block from a string.', function () {
    var blocks = code('\n```js\nfoo\n```\n');
    assert.equal(blocks[0].block, '```js\nfoo\n```');
    assert.equal(blocks[0].lang, 'js');
    assert.equal(blocks[0].code, 'foo');
  });

  it('should get a code block from a string.', function () {
    var blocks = code('abc\n```bash\nbar\n```\nxyz');
    assert.equal(blocks[0].block, '```bash\nbar\n```');
    assert.equal(blocks[0].lang, 'bash');
    assert.equal(blocks[0].code, 'bar');
  });
});