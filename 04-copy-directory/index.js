const fs = require('fs');
const path = require('path');
const source = '04-copy-directory/files';
const destination = `\\04-copy-directory\\files-copy`;
fs.rm(path.resolve() + destination, {recursive: true}, (err) => {
    if (err) {
        console.log('папки нет');
        console.log(path.resolve() + destination)
    }
    copyDir()
})
function copyDir() {
    fs.stat(path.resolve() + destination, (err) => {
        // если папка есть
        if (!err) {
            fs.readdir(source, (err, files) => {
                for (file of files) {
                    fs.copyFile(source + '\\' + file, path.resolve() + destination + '\\' + file, err => {
                        //if(err) { throw err };
                    });
                }
            })
        } else {
            fs.mkdir(path.resolve() + destination, (err) => {
                if (err) { throw err };
            });
            fs.readdir(source, (err, files) => {
                for (file of files) {
                    fs.copyFile(source + '\\' + file, path.resolve() + destination + '\\' + file, err => {
                        if(err) { throw err };
                    });
                }
            })
        }
    })
}
