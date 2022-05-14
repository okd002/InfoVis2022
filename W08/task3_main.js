d3.csv("https://okd002.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => {d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:10, bottom:0, left:0},
            title: 'Pie Chart',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });