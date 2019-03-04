module.exports = function (config) {
    if(config.data_store === "s3"){
        return require("./lib/s3")(config);
    }
    else if(config.data_store === "fs"){
        return require("./lib/fs");
    }
    //TODO
    // else if(config.data_store === "mongo"){
    //     return require("./lib/mongo")(config);
    // }
};
