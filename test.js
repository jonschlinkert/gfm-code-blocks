/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var codeBlocks = require('./');

describe('code block', function () {
  it('should return the code blocks from the fixture.', function () {
    var blocks = codeBlocks('text\n```js\nfoo\n```\ntext');
    assert(blocks);
    assert.equal(typeof blocks, 'object');
  });

  it('should get a code block from a string.', function () {
    var blocks = codeBlocks('text\n```js\nfoo\n```\ntext');
    assert.equal(blocks[0].block, '```js\nfoo\n```');
    assert.equal(blocks[0].lang, 'js');
    assert.equal(blocks[0].code, '\nfoo\n');
    assert.equal(blocks[0].start, 5);
    assert.equal(blocks[0].end, 18);
  });

  it('should get the language from a code block.', function () {
    assert.equal(codeBlocks('text\n```js\nfoo\n```\ntext')[0].lang, 'js');
  });

  it('should get a code block from a string arounded with other data (text).', function () {
    var blocks = codeBlocks('abc\n```bash\nbar\n```\nxyz');
    assert.equal(blocks[0].block, '```bash\nbar\n```');
    assert.equal(blocks[0].lang, 'bash');
    assert.equal(blocks[0].code, '\nbar\n');
    assert.equal(blocks[0].start, 4);
  });

  it('should have position properties `start` and `end`.', function () {
    var blocks = codeBlocks('usage\n```js\nvar qux = 123;\n```\nxyz');
    assert.equal(blocks[0].block, '```js\nvar qux = 123;\n```');
    assert.equal(blocks[0].lang, 'js');
    assert.equal(blocks[0].code, '\nvar qux = 123;\n');
    assert.equal(blocks[0].start, 6);
    assert.equal(blocks[0].end, 30);
  });
});
