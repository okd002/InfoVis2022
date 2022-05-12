d3.csv("https://okd002.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.label = +d.label; d.value = +d.value;});

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:25, right:10, bottom:50, left:50},
            title: 'Sample Data',
            xlabel: 'X label',
            ylabel: 'Y label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });