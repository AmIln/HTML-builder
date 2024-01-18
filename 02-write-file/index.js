const fs = require('fs'),
readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout),
textFile = '02-write-file/text.txt';

rl.setPrompt('Запись >');
rl.prompt();

rl.on('line', function(text) {
    if (text.trim() === 'stop') rl.close()
    fs.appendFileSync(textFile, text);
    rl.prompt();
}).on('close', function() {
    console.log('всего хо-ро-ше-го');
    process.exit(0);
});