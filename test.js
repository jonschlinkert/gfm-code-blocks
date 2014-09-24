/*!
 * gfm-code-blocks <https://github.com/jonschlinkert/gfm-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
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
    console.log(codeBlocks(readme))
    codeBlocks(readme)[0].lang.should.equal('bash');
  });

  it('should get a code block from a string.', function () {
    var blocks = codeBlocks('\n```js\nfoo\n```\n');
    blocks[0].block.should.equal('```js\nfoo\n```');
    blocks[0].lang.should.equal('js');
    blocks[0].code.should.equal('foo');
  });

  it('should get a code block from a string.', function () {
    var blocks = codeBlocks('abc\n```bash\nbar\n```\nxyz');
    blocks[0].block.should.equal('```bash\nbar\n```');
    blocks[0].lang.should.equal('bash');
    blocks[0].code.should.equal('bar');
  });
});