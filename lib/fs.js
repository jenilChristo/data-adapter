const fs = require('fs');

//Save File API
export async function saveFile(options) {
    let path = options.path || "/";
    let content = options.content || "No content passed";

    return new Promise((resolve, reject) => {
        if (isExist(path)) {
            reject("File already exists")
        }
        if (!isValidPath(path) && path.match(/\//).length != 1) {
            createDirIfNotExist(path);
        }

        fs.writeFile(path, content, (err) => {
            if (err) {
                reject(new Error(err));
            }
            else {
                resolve({
                    savedIn: path,
                    status: "OK"
                });
            }
        });
    });
}
//Get File API
export async function getFile(options) {
    const path = options.path || "./";
    const output = options.output || "new.txt";

    //create out dir if not exists
    if (!fs.existsSync('./out')) {
        fs.mkdirSync('./out');
    }

    return new Promise((resolve, reject) => {
        if (!isExist(path)) {
            reject("Cannot Read! File doesn't exist");
        }
        let readerStream = fs.createReadStream(path);
        let writerStream = fs.createWriteStream('./out/' + output);
        readerStream.pipe(writerStream);

        //handle file transfer
        writerStream.on("finish", function (data) {
            resolve({
                status: "OK",
                message: "file transferred successfully into out/" + output
            })
        });

        //handle errors
        writerStream.on("error", function (err) {
            reject(err);
        });
        readerStream.on("error", function (err) {
            reject(err);
        });

    });
}
//Delete File API
export async function deleteFile(options) {
    const path = (options && options.path) || null;
    return new Promise((resolve, reject) => {
        if (path === null || !isExist(path)) {
            reject("File doesn't exist and cannot be deleted")
        } else {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ status: "OK", message: "File deleted successfully" });
                }
            });
        }
    });
}
//Meta Data API
export async function getMetaData(options) {
    const path = (options && options.path) || null;
    return new Promise((resolve, reject) => {
        if (path === null || !isExist(path)) {
            reject("File doesn't exist and meta data cannot be fetched")
        } else {
            fs.stat(path, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ status: "OK", meta: stats, message: "Meta fetched successfully" });
                }
            });
        }
    });
}


//other util functions
function isValidPath(path) {
    if (path.toString() != '' && fs.existsSync(path)) {
        return true;
    }
    return false;
}
function createDirIfNotExist(path) {
    if (path.toString() != '' && !fs.existsSync(path)) {
        let dirPath = path.split("/");
        //remove file name from path
        dirPath.pop();
        dirPath = dirPath.toString().replace(new RegExp(',', 'g'), "/");
        fs.mkdirSync(dirPath);
    }
}
function isExist(path) {
    if (fs.existsSync(path)) {
        return true
    }
    return false;
}
