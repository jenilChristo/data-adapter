"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMetaData = exports.deleteFile = exports.getFile = exports.saveFile = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//Save File API
var saveFile = exports.saveFile = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
        var path, content;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        path = options.path || "/";
                        content = options.content || "No content passed";
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                            if (isExist(path)) {
                                reject("File already exists");
                            }
                            if (!isValidPath(path) && path.match(/\//).length != 1) {
                                createDirIfNotExist(path);
                            }

                            fs.writeFile(path, content, function (err) {
                                if (err) {
                                    reject(new Error(err));
                                } else {
                                    resolve({
                                        savedIn: path,
                                        status: "OK"
                                    });
                                }
                            });
                        }));

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function saveFile(_x) {
        return _ref.apply(this, arguments);
    };
}();
//Get File API


var getFile = exports.getFile = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options) {
        var path, output;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        path = options.path || "./";
                        output = options.output || "new.txt";

                        //create out dir if not exists

                        if (!fs.existsSync('./out')) {
                            fs.mkdirSync('./out');
                        }

                        return _context2.abrupt("return", new Promise(function (resolve, reject) {
                            if (!isExist(path)) {
                                reject("Cannot Read! File doesn't exist");
                            }
                            var readerStream = fs.createReadStream(path);
                            var writerStream = fs.createWriteStream('./out/' + output);
                            readerStream.pipe(writerStream);

                            //handle file transfer
                            writerStream.on("finish", function (data) {
                                resolve({
                                    status: "OK",
                                    message: "file transferred successfully into out/" + output
                                });
                            });

                            //handle errors
                            writerStream.on("error", function (err) {
                                reject(err);
                            });
                            readerStream.on("error", function (err) {
                                reject(err);
                            });
                        }));

                    case 4:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getFile(_x2) {
        return _ref2.apply(this, arguments);
    };
}();
//Delete File API


var deleteFile = exports.deleteFile = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options) {
        var path;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        path = options && options.path || null;
                        return _context3.abrupt("return", new Promise(function (resolve, reject) {
                            if (path === null || !isExist(path)) {
                                reject("File doesn't exist and cannot be deleted");
                            } else {
                                fs.unlink(path, function (err) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({ status: "OK", message: "File deleted successfully" });
                                    }
                                });
                            }
                        }));

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function deleteFile(_x3) {
        return _ref3.apply(this, arguments);
    };
}();
//Meta Data API


var getMetaData = exports.getMetaData = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(options) {
        var path;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        path = options && options.path || null;
                        return _context4.abrupt("return", new Promise(function (resolve, reject) {
                            if (path === null || !isExist(path)) {
                                reject("File doesn't exist and meta data cannot be fetched");
                            } else {
                                fs.stat(path, function (err, stats) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve({ status: "OK", meta: stats, message: "Meta fetched successfully" });
                                    }
                                });
                            }
                        }));

                    case 2:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function getMetaData(_x4) {
        return _ref4.apply(this, arguments);
    };
}();

//other util functions


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');function isValidPath(path) {
    if (path.toString() != '' && fs.existsSync(path)) {
        return true;
    }
    return false;
}
function createDirIfNotExist(path) {
    if (path.toString() != '' && !fs.existsSync(path)) {
        var dirPath = path.split("/");
        //remove file name from path
        dirPath.pop();
        dirPath = dirPath.toString().replace(new RegExp(',', 'g'), "/");
        fs.mkdirSync(dirPath);
    }
}
function isExist(path) {
    if (fs.existsSync(path)) {
        return true;
    }
    return false;
}