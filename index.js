

module.exports = function (str, fn) {
  var obj = {};

  var revert = function (str, obj) {
    var re = /(__FENCED([0-9]+)__)/g;
    return str.replace(re, function (ea) {
      return ea.replace(ea, obj[ea]);
    });
  };

  function blocks(str) {
    var i = 0;
    var re = /^\s*(`{3})\s*(\S+)?\s*([\s\S]+?)\s*(`{3})\s*(?:\n+|$)/gm;
    return str.replace(re, function (match, fence1, lang, code, fence2) {
      var placeholder = '__FENCED' + i + '__';
      obj[placeholder] = match;
      i++;
      return placeholder;
    });
  }

  return (fn ? fn : revert)(blocks(str), obj);
};