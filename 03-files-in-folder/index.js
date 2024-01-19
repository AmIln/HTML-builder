const fs = require("fs");
const path = require('path');

fs.readdir("03-files-in-folder/secret-folder", (error, files) => {
        if (error) return console.log(error);

        for (file of files) {
            const ziseFile = `03-files-in-folder/secret-folder/${file}`,
            stats = fs.statSync(ziseFile),
            sizeButes = stats.size,
            nameFile = path.basename(file, path.extname(file)),
            typeFile = path.extname(file).replace('.', '');

            if (stats.isFile()) {
                console.log(`${nameFile} - ${typeFile} - ${sizeButes}b`);
            }
        }
});