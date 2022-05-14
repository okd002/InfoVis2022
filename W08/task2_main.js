d3.csv("https://okd002.github.io/InfoVis2022/W08/task2.csv")
    .then( data => {
        data.forEach( d => {d.x = +d.x; d.y = +d.y;});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:25, right:50, bottom:50, left:50},
        };

        const line_chart = new LineChart( config, data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });