/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
require('should');
require('mocha');
var helpers = require('test-helpers')({dir: './'});
var readme = helpers.readFixture('README.md');
var codeBlocks = require('./');

describe('code block', function () {
  it('should return the code blocks from the fixture.', function () {
    var blocks = codeBlocks(readme);
    blocks.should.be.an.object;
  });

  it('should get the language from a code block.', function () {
    var readme = helpers.readFixture('README.md');
    codeBlocks(readme)[0].lang.should.equal('bash');
  });

  it('should get a code block from a string.', function () {
    var blocks = codeBlocks('```js\nfoo\n```');
    blocks[0].block.should.equal('```js\nfoo\n```');
    blocks[0].lang.should.equal('js');
    blocks[0].code.should.equal('foo');
    blocks[0].start.should.equal(0);
    blocks[0].end.should.equal(13);
  });

  it('should get a code block from a string arounded with other data (text).', function () {
    var blocks = codeBlocks('abc\n```bash\nbar\n```\nxyz');
    blocks[0].block.should.equal('```bash\nbar\n```');
    blocks[0].lang.should.equal('bash');
    blocks[0].code.should.equal('bar');
    blocks[0].start.should.equal(4);
  });

  it('should have position properties `start` and `end`.', function () {
    var blocks = codeBlocks('usage\n```js\nvar qux = 123;\n```\nxyz');
    blocks[0].block.should.equal('```js\nvar qux = 123;\n```');
    blocks[0].lang.should.equal('js');
    blocks[0].code.should.equal('var qux = 123;');
    blocks[0].start.should.equal(6);
    blocks[0].end.should.equal(30);
  });
});
