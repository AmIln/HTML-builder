const fs = require('fs');
let read = new fs.ReadStream('01-read-file\\text.txt', 'utf8');

read.on('readable', () => {
    let data = read.read();
    console.log(data)
})