(function(exports){
  var chalk = require('chalk'),
      q = require('q'),
      mongoose = require('mongoose');

  function hideLogs () {
    switch(process.env.HIDE_SE_LOG) {
      case 'true':
        return true;
      case 'false':
      case undefined:
        return false;
      default:
        var message = 'Warning: Invalid value for HIDE_SE_LOG (must be "true" or "false")';
        console.log(chalk.yellow(' > ') + message);
        return false;
    }
  }

  function logError (mongodb) {
    if(!hideLogs()) {
      var message = 'Mongoose failed to connect to: ' + mongodb;
      console.log(chalk.red(" ✘ ") + message);
    }
  }

  function logSuccess (mongodb) {
    if(!hideLogs()) {
      var message = 'Mongoose connected to: ' + mongodb;
      console.log(chalk.green(" ✔ ") + message);
    }
  }

  exports.start = function (app) {
    var mongodb = app.get('MONGO_URL') || process.env.MONGO_URL,
        deferred = q.defer();
    mongoose.connect(mongodb, function(err){
      if(err) {
        logError(mongodb);
        deferred.reject(err);
      } else {
        logSuccess(mongodb);
        deferred.resolve(mongoose);
      }
    });
    return deferred.promise;
  };
})(module.exports);
