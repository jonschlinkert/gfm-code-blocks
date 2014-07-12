

var codeBlocks = require('..');
var file = require('fs-utils');


var readme = file.readFileSync('test/fixtures/README.md');
file.writeFileSync('test/actual/README.md', codeBlocks(readme));


var assemble = file.readFileSync('test/fixtures/assemble.md');
file.writeFileSync('test/actual/assemble.md', codeBlocks(assemble));

var expander = file.readFileSync('test/fixtures/expander.md');
file.writeFileSync('test/actual/expander.md', codeBlocks(expander));

var ansi = file.readFileSync('test/fixtures/ansi.md');
file.writeFileSync('test/actual/ansi.md', codeBlocks(ansi));


var async = file.readFileSync('test/fixtures/async.md');
file.writeFileSync('test/actual/async.md', codeBlocks(async));
