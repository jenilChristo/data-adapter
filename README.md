# DATA-ADAPTER

Focusing on the pain points of a developer while moving files across different storages lik file system,AWS,MongoDB or any other cloud environment, This module serves as a easy to switch adapter interface for File system and AWS currently.This library can be extended easily to support any cloud storages or databases.Contributions Welcome!

#### How to install this module:

From your node project folder run  the below npm command.You must have the git system to install this as the module is not yet published in npm repository

`npm i git+ssh://git@github.com:jenilChristo/data-adapter.git#master`

#### How to initialise the module:

`const dataAdapter = require('data-adapter')(config);`

config is a configurable object for the adapter that chooses the data store.Config looks like

`const config = { 
  data_store:"fs", //can be fs,s3
  s3:{
      bucket:"bucket_name",
      apiVersin:"apiVersion to connect",
      cPath:"path to s3 config json",
  }
}`

### Supported API's
All the API's are promise based to support asynchronisity .Thus errors has to be handled appropriately in the promise chains

* saveFile()
* getFile()
* deleteFile()
* getMetaData()

### saveFile(options)
Saves a file to either s3 bucket or the filesystem based on data_store value.

options is an object which must have `options.path` set to a valid file path to save. 

It resolves to `{status:"OK",savedIn:"path"}`, if file is written successfully

### getFile(options)
Reads a file  either from s3 bucket or the filesystem based on data_store value.

options is an object which must have `options.path` set to a valid file path to get file data
and `options.output` is the output file name to write.

This method automatically creates a folder `./out` if not exists and stores all get Files here.
It resolves with the destination of the fetched output file

###  deleteFile(options)

`options.path` represents the key/name of the file to be deleted.This is a required parameter for this API

Resolves with `{ status: "OK", message: "File deleted successfully" }`, if file is deleted succesfully

###  getMetaData(options)

`options.path` represents the key/name of the file to be deleted.This is a required parameter for this API

Resolves with Meta info of the file, from which last_updated_date etc can be accessed.

### Tests
Tests are written in mocha, chai and sinon.To run all test cases run the following command

`npm run test`

### Useful Reference
* https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
* https://nodejs.org/api/stream.html#stream_readable_streams
* https://nodejs.org/api/fs.html
* https://sinonjs.org

### Issues
* To raise an issue 