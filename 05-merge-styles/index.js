const fs = require('fs');
const path = require('path');
const stylesFolder = '\\05-merge-styles\\styles';
const distFolder = '\\05-merge-styles\\project-dist';


fs.readdir(path.resolve() + distFolder, (err) => {
    let bundleFolder = path.resolve() + distFolder + '\\bundle.css';
    fs.access(bundleFolder, (err) => {
        // файла нет
        if (err) {
            // создание bundle
            fs.writeFile('bundle.css', '', (err) => {
                if (err) { throw err };
                // перемещение bundle
                fs.rename('bundle.css', bundleFolder, (err) => {
                });
                // удаление bundle
                fs.unlink('bundle.css', err => {
                    if(err) throw err;
                });
            });
        };
        fs.unlink(bundleFolder, (err) => {
        });
    })
})
fs.readdir(path.resolve() + stylesFolder, (err, files) => {
    for (file of files) {
        if (path.extname(file).replace('.', '') != 'css') {
            // это не css
        } else {
            fs.readFile(path.resolve() + stylesFolder + '\\' + file, (err, data) => {
                if (err) { throw err };
                fs.appendFile(path.resolve() + distFolder + '\\bundle.css', data.toString(), (err) => {
                    if (err) { throw err };
                })
            })
        }
    }
})