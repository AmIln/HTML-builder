const fs = require("fs");
const path = require('path');

fs.readdir("03-files-in-folder/secret-folder", (error, files) => {
        if (error) return console.log(error);

        for (file of files) {
            const pathFile = `03-files-in-folder/secret-folder/${file}`,
            nameFile = path.basename(file, path.extname(file)),
            typeFile = path.extname(file).replace('.', '');
            ziseFile = fs.stat(pathFile, (err, stats) => {
                if (err) { throw err };
                if (stats.isFile()) {
                    console.log(`${nameFile} - ${typeFile} - ${stats.size}b`);
                }
            });
        }
});