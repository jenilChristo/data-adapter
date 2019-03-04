const s3Util = require('../../dist/lib/s3')({s3:{
    bucket:"bucket_name"
}});
const fs = require('fs');
const sinon = require('sinon');
const { assert } = require('chai');


describe("Tests for s3 adapter @s3-test@ @bullet-proof@", function(){
    console.log(s3Util)
    it("#saveFile should be a function", function(){
        assert.isFunction(s3Util.saveFile);
    });
    it("#getFile should be a function", function(){
        assert.isFunction(s3Util.getFile);
    });
    it("#deleteFile should be a function", function(){
        assert.isFunction(s3Util.deleteFile);
    });
    it("#getMetaData should be a function", function(){
        assert.isFunction(s3Util.getMetaData);
    });
});
