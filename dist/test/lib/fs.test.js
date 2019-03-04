const fsUtil = require('../../dist/lib/fs');
const fs = require('fs');
const sinon = require('sinon');
const { assert } = require('chai');

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
        let writeFileStub = sinon.stub(fs, 'writeFile');
        let options = {
            path: "/new.txt",
            content: "Hello"
        };
        fsUtil.saveFile(options);
        assert.isTrue(writeFileStub.calledOnce);
        writeFileStub.restore();
    });
});