// Path Module
const path = require('path');

const fullpath = path.join(__dirname, 'file.txt');
console.log(fullpath)

const ext = path.extname('file.txt');
console.log(ext)

const filepath = '/users/john/doc/file.txt'
console.log(path.basename(filepath));

console.log(path.dirname(filepath))
