var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // var ctx = $("#myChart").get(0).getContext("2d");
    // initGraph(ctx);
    // var random_images_array = ['Noise1.png', 'Noise2.png', 'Noise3.png', 'Noise4.png', 'Noise5.png'];
    // setInterval(readData, 500);
    loadHighChart();
    //setInterval(loadHighChart, 2000);
});

// Functions =============================================================

// Fill table with data
function readData() {
    var random_images_array = ['Noise1.png', 'Noise2.png', 'Noise3.png', 'Noise4.png', 'Noise5.png'];
    $.getJSON('http://192.168.0.116:3005/api/sensors/last', function(data) {
     // Insert JavaScript code to operate on return data });
        // var soundValue = data.field3
        // getRandomImage(random_images_array, soundValue)

        var lightValue = data.light
        getRandomImageForLight(random_images_array, lightValue)
    });   
}

function getRandomImageForLight(random_images_array, lightValue) {
    path = 'images/'; // default path here
    var num = Math.floor(lightValue/200) - 1
    var img = random_images_array[num];
    var imgStr = '<img src="' + path + img + '" alt = "">';
    document.write(imgStr); 
    document.close();
}
function getRandomImage(random_images_array ,soundValue) {
    path = 'images/'; // default path here
    var num = Math.floor(soundValue*4)
    var img = random_images_array[num];
    var imgStr = '<img src="' + path + img + '" alt = "">';
    document.write(imgStr); 
    document.close();
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;

    // This next line will just add it to the <body> tag
    document.body.appendChild(img);
}
function loadHighChart() {
    var socket = io.connect('http://192.168.0.254:3005',{reconnect: true});

    // I create a new object 'Chart'
    var chart;
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart', 
            defaultSeriesType: 'spline',
            events: {
                load: function() {
                    // Each time you receive a value from the socket, I put it on the graph
                    socket.on("sensorUpdate", function(time, sensor) {  
                        // todo: add the tweet as a DOM node
                        console.log("Temperature ");
                        console.log("light", sensor.light);

                        var series = chart.series[0];
                        series.addPoint([time, sensor.light]);
                    });
                }
            }
        },
        rangeSelector : {
            selected : 100
        },
        title: {
            text: 'SICLO Light '
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'Illuminance lux',
                margin: 80
            }
        },
        series: [{
            name: 'Illuminance',
            data: []
        }]
    });
}

