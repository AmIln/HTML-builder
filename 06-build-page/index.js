const fs = require('fs');
const path = require('path');
const template = path.resolve() + '\\06-build-page\\template.html';
const stylesFolder = path.resolve() + '\\06-build-page\\styles';
const index = path.resolve() + '\\06-build-page\\project-dist\\index.html';
const style = path.resolve() + '\\06-build-page\\project-dist\\style.css';
const dirname = path.resolve() + '\\06-build-page\\project-dist';
const header = path.resolve() + '\\06-build-page\\components\\header.html';
const footer = path.resolve() + '\\06-build-page\\components\\footer.html';
const articles = path.resolve() + '\\06-build-page\\components\\articles.html';
const about = path.resolve() + '\\06-build-page\\components\\about.html';
const assets = path.resolve() + '\\06-build-page\\assets';
const newAssets = path.resolve() + '\\06-build-page\\project-dist\\assets';

deleteDist()


function createFiles() {
    fs.writeFile(index, '', (err) => {});
    fs.writeFile(style, '', (err) => {});
    createAssets(assets)
    createHTML()
    collectStyles()
}

function createAssets(way) {

    fs.readdir(way, (err, files) => {
        for (file of files) {
            const item = way + '\\' + file;

            collStat(item, file)
        }
    })
}

function collStat(item, name) {
    const folderName = newAssets + '\\' + name;

    fs.stat(item, (err, stats) => {
        if (stats.isDirectory()) {
            // создаем папку
            fs.mkdir(folderName, { recursive: true }, err => {
                // рекурсируем в эту папку
                fs.readdir(item, (err, files) => {
                    for (file of files) {
                        copy(item + '\\' + file, folderName + '\\' + file)
                    }
                })
            });
        } else {
            copy(item, folderName)
        }
    });
}

function copy(where, here) {
    fs.copyFile(where, here, (err) => {
    });
}
function deleteDist() {
    fs.rm(dirname, { recursive: true },(err) => {
        if (err) {}
        createDist()
    });
}
function createDist() {
    fs.mkdir(dirname, (err) => {
        if(err) {
            console.log('папка есть');
        };
        createFiles()
    });
}

function createHTML() {
    fs.readFile(template, 'utf8', (err, fileContent) => {
        if (err) {
            console.log('ERR')
        }

        fs.appendFile(index, fileContent.toString(), (err) => {
            if (err) { 'чет не добавилось' };
        });
        fs.readFile(header, (err, dataHeader) => {
            if (err) { console.log('что-то с header') };

            fs.readFile(articles, (err, dataArticles) => {
                if (err) { console.log('что-то с articles') };

                fs.readFile(footer, (err, dataFooter) => {
                    if (err) { console.log('что-то с footer') };

                    fs.readFile(about, (err, dataAbout) => {
                        if (err) {
                            fs.readFile(index, (err, dataIndex) => {
                                if (err) { console.log('ошибка при переписывании')}
                                const rewrite = dataIndex.toString().replace(/{{header}}/g, dataHeader.toString()).replace(/{{articles}}/g, dataArticles.toString()).replace(/{{footer}}/g, dataFooter.toString());
                                fs.writeFile(index, rewrite, (err) => {
                                    if (err) { console.log('ошибка перезаписи') };
                                })
                            })
                        } else {
                            fs.readFile(index, (err, dataIndex) => {
                                if (err) { console.log('ошибка при переписывании')}
                                const rewrite = dataIndex.toString().replace(/{{header}}/g, dataHeader.toString()).replace(/{{articles}}/g, dataArticles.toString()).replace(/{{footer}}/g, dataFooter.toString()).replace(/{{about}}/g, dataAbout.toString());
                                fs.writeFile(index, rewrite, (err) => {
                                    if (err) { console.log('ошибка перезаписи') };
                                })
                            })
                        }
                    })
                })
            })
        })
    })
}

function collectStyles() {
    fs.readdir(stylesFolder, (err, files) => {
        for (file of files) {
            fs.readFile(stylesFolder + '\\' + file, (err, dataStyle) => {
                if (err) { console.log('проблема со стилями')};
                fs.appendFile(style, '\n' + dataStyle.toString(), (err) => {
                    if (err) {console.log('проблемный стиль')};
                })
            })
        }
    })
}