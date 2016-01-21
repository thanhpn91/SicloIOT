var express = require('express');
var path = require('path');
var router = express.Router();
var sensorsRouter = router.route('/');
var mongoose = require('mongoose');
var Sensor = require('../models/sensor');
var io = require('../io');
// var io = require('socket.io');

sensorsRouter.post(function(req,res){
	var newSensor = new Sensor();

	newSensor.deviceID = req.body.deviceID;
	newSensor.temp = req.body.temperature;
	newSensor.humidity = req.body.humidity;
	newSensor.light = req.body.light;
	newSensor.sound = req.body.sound;

	newSensor.save(function(err){
		if(err)
			res.send(err);

		var date = new Date().getTime();
		io.emit("sensorUpdate", date, newSensor)
		res.json({ message: 'Data added to the database', data: newSensor })
	});
});

/* GET sensors listing. */
sensorsRouter.get(function(req, res){
	 // res.send('respond with a resource');
	Sensor.find(function(err, sensors){
		if(err)
			res.send(err)

		res.json(sensors)
	})
});

var sensorRouter = router.route('/sensors/:sensor_id');
sensorRouter.get(function(req, res){
	Sensor.findById(req.params.sensor_id,function(err,sensor){
		if(err)
			res.send(err);
		
		res.json(sensor);
	});
});

var sensorRouter = router.route('/last');
sensorRouter.get(function(req, res){
	 // res.send('respond with a resource');
	Sensor.find(function(err, sensors){
		if(err)
			res.send(err)

		res.json(sensors.slice().pop())
	})
});
module.exports = router;