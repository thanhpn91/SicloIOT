var startExpressMongoose = require('../index'),
    express = require('express'),
    mongoose = require('mongoose');

describe('#start', function(){

  beforeEach(function(){
    this.app = express();
  });

  afterEach(function(){
    delete process.env.MONGODB_URL;
    mongoose.connection.close();
  });

  describe('creating a successful connection', function(){

    describe('when MongoDB URL is set using an enviromental variable', function(){

      beforeEach(function(){
        process.env.MONGO_URL = 'mongodb://localhost/start-express-mongoose';
        this.promise = startExpressMongoose.start(this.app);
      });

      it('resolves the promise', function(done){
        this.promise.then(function(){
          done();
        });
      });

    });

    describe('when MongoDB URL is set using "app.set"', function(){

      beforeEach(function(){
        this.app.set('MONGO_URL', 'mongodb://localhost/start-express-mongoose');
        this.promise = startExpressMongoose.start(this.app);
      });

      it('resolves the promise', function(done){
        this.promise.then(function(){
          done();
        });
      });

    });

  });

  describe('failing to create a connection', function(){

    describe('when MongoDB URL is invalid', function(){

      beforeEach(function(){
        process.env.MONGO_URL = 'fakehost://example';
        this.promise = startExpressMongoose.start(this.app);
      });

      it('rejects the promise', function(done){
        this.promise.fail(function(err){
          done();
        });
      });

    });

    describe('when MongoDB URL is not defined', function(){

      beforeEach(function(){
        delete process.env.MONGO_URL;
        this.promise = startExpressMongoose.start(this.app);
      });

      it('rejects the promise', function(done){
        this.promise.fail(function(err){
          done();
        });
      });

    });

  });
});
