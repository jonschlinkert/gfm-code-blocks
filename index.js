/*!
 * fenced-code-blocks <https://github.com/jonschlinkert/fenced-code-blocks>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var Cache = require('./hash');
// var parser = module.exports =  new Cache();

var parser = module.exports;

parser.items = {};

parser.set = function(key, value) {
  parser.items[this.key(key)] = value;
};

parser.get = function(key, value) {
  return parser.items[this.key(key)];
};

parser.key = function(key) {
  return '__CODE_BLOCK_' + key + '__';
};

parser.writeCodeBlock = function (key) {
  var block = this.items[key];
  var code = '';
  code += '```' + block.lang;
  code += '\n' + block.code + '\n';
  code += '```\n';
  return '\n' + code + '\n';
};

parser.extract = function(str) {
  var i = 0;
  var fenced = /^\s*(`{3})\s*(\S+)?\s*([\s\S]+?)\s*(`{3})\s*(?:\n+|$)/gm;
  var indented = /^( {4}[^\n]+\n*)+/gm;
  console.log(str.match(indented));
  if (fenced.exec(str)) {
    str = str.replace(fenced, function (match, open, lang, code, close, i) {
      parser.set(i, {lang: lang, code: code});
      return match.replace(match, parser.key(i));
    });
  }
  return str;
};

parser.replace = function (str, obj) {
  var heuristic = /(__CODE_BLOCK_([0-9]+)__)/g;
  str = parser.extract(str);

  return str.match(heuristic).reduce(function(content, a, b, c) {
    return content.replace(a, this.writeCodeBlock(a));
  }.bind(this), str);
};



var file = require('fs-utils');
var readme = file.readFileSync('test/fixtures/assemble.md');
console.log(parser.replace(readme))
// console.log(replace(readme))