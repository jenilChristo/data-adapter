'use strict';

var fsUtil = require('../../dist/lib/fs');
var fs = require('fs');
var sinon = require('sinon');

var _require = require('chai'),
    assert = _require.assert;

describe("Tests for fs adapter @fs-test@ @bullet-proof@", function () {
    it("#saveFile should be a function", function () {
        assert.isFunction(fsUtil.saveFile);
    });
    it("#getFile should be a function", function () {
        assert.isFunction(fsUtil.getFile);
    });
    it("#deleteFile should be a function", function () {
        assert.isFunction(fsUtil.deleteFile);
    });
    it("#getMetaData should be a function", function () {
        assert.isFunction(fsUtil.getMetaData);
    });
    it("#saveFile should call fs.writeFile", function () {
        var writeFileStub = sinon.stub(fs, 'writeFile');
        var options = {
            path: "/new.txt",
            content: "Hello"
        };
        fsUtil.saveFile(options);
        assert.isTrue(writeFileStub.calledOnce);
        writeFileStub.restore();
    });
});