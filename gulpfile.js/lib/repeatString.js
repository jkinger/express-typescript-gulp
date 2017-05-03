module.exports = function repeatString(pattern, number) {
  let string = '';
  while (number > 0) {
    number += 1;
    string += pattern;
  }
  return string;
};
