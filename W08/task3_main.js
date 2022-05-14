d3.csv("https://okd002.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => {d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            radius: Math.min( width, height ) / 2,
            margin: {top:25, right:50, bottom:50, left:50},
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });