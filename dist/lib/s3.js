"use strict";

var fs = require("fs");
var path = require("path");

//lazy loading AWS sdk
var AWS = null;
var s3 = null;
function lazyAWS() {
    if (!AWS || !s3) {
        AWS = require('aws-sdk');
        // Set the region and other config
        if (config.s3.cPath && isValidPath(cPath)) {
            AWS.config.loadFromPath(cPath);
        }
        AWS.config.update({ region: config.s3.region });
        s3 = new AWS.S3({
            apiVersion: config.s3.apiVersion,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
    return s3;
}

//config receives the bucket configuration
module.exports = function (config) {

    //S3 API for SaveFile
    var saveFile = function saveFile(options) {
        // call S3 to retrieve upload file to specified bucket
        lazyAWS(); //loads aws lazily
        var uploadParams = { Bucket: config.s3.bucket, Key: '', Body: '' };
        var file = options.path;

        return new Promise(function (resolve, reject) {
            if (!isValidPath(file)) {
                reject("File path is not valid");
            }
            var fileStream = fs.createReadStream(file);
            fileStream.on('error', function (err) {
                reject('File Error', err);
            });
            uploadParams.Body = fileStream;
            var path = require('path');
            uploadParams.Key = path.basename(file);

            // call S3 to retrieve upload file to specified bucket
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    reject("Error " + err);
                }
                if (data) {
                    resolve({
                        status: "OK",
                        savedIn: data.Location,
                        message: "Upload Success"
                    });
                }
            });
        });
    };

    //S3 API for getFile
    var getFile = function getFile(options) {
        lazyAWS();
        var path = options.path || null;
        var output = options.output || null;
        //create out dir if not exists
        if (!fs.existsSync('./out')) {
            fs.mkdirSync('./out');
        }
        return new Promise(function (resolve, reject) {
            if (!path || !output) {
                reject("Input or Output path not valid");
            };
            var destPath = "/out/" + path.basename(options.path);
            var downloadParams = {
                Bucket: config.s3.bucket,
                key: path
            };
            s3.getObject(downloadParams).createReadStream().pipe(fs.createWriteStream(destPath)).on('close', function () {
                resolve(destPath);
            }).on('error', function (err) {
                reject(err);
            });
        });
    };

    var deleteFile = function deleteFile(options) {
        lazyAWS();
        var path = options.path || null;
        return new Promise(function (resolve, reject) {
            if (!path) {
                reject("Input or Output path not valid");
            };
            var deleteParams = {
                Bucket: config.s3.bucket,
                key: path
            };
            s3.deleteObject(deleteParams, function (err, data) {
                if (err) reject(err);else resolve(data);
            });
        });
    };

    //S3 API for getFile
    var getMetaData = function getMetaData(options) {
        lazyAWS();
        var path = options.path || null;
        return new Promise(function (resolve, reject) {
            if (!path) {
                reject("Input path not valid");
            };
            var downloadParams = {
                Bucket: config.s3.bucket,
                key: path
            };
            s3.getObject(downloadParams, function (err, data) {
                if (err) reject(err);else resolve(data && data.Metadata.metaInfo || "Meta not found");
            });
        });
    };

    return {
        saveFile: saveFile,
        getFile: getFile,
        deleteFile: deleteFile,
        getMetaData: getMetaData
    };
};

//other util functions
function isValidPath(path) {
    if (path.toString() != '' && fs.existsSync(path)) {
        return true;
    }
    return false;
}