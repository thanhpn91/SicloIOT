# start-express-mongoose
[![Build Status](https://travis-ci.org/jpstevens/start-express-mongoose.svg?branch=master)](https://travis-ci.org/jpstevens/start-express-mongoose)
![Downloads/month](http://img.shields.io/npm/dm/start-express-mongoose.svg)

A Mongoose boot helper for Express.js

## Installation

```bash
$ npm install start-express-mongoose --save
```

## Example Usage:

```javascript
var app = require('express')();

// method #1
app.set('MONGO_URL', 'mongodb://user:pass@server.mongohq.com/db_name');
// method #2
process.env.MONGO_URL = 'mongodb://user:pass@server.mongohq.com/db_name';

// start HTTP server
require('start-express-mongoose').start(app)
.then(function(mongoose){/* success */})
.fail(function(err) { /* error */ });
```

## Hiding Log Output:

By default, this module will show log output similar to the following:
```bash
$ npm start
✔ Mongoose connected to: mongodb://localhost/start-express-mongoose
```

To hide this log output, set the `HIDE_SE_LOG` flag to `true`:

```bash
$ HIDE_SE_LOG=true npm start
```

`HIDE_SE_LOG` can equal `true` or `false` (default `false`).
